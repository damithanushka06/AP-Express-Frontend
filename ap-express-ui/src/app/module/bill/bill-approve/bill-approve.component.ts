import {Component, Input, OnInit} from '@angular/core';
import {BillMasterDto} from "../../shared/dto/BillMasterDto";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {BillService} from "../../../services/bill/bill.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-bill-approve',
  templateUrl: './bill-approve.component.html',
  styleUrls: ['./bill-approve.component.scss']
})
export class BillApproveComponent implements OnInit {
  @Input() billId: any;
  public billMst: BillMasterDto = new BillMasterDto();
  isRejected: boolean = false;
  currentLevel!: number;
  noOfWorkflowLevel!: number;

  constructor(public billService: BillService, public notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.getBillById();
  }


  /**
   * Retrieves the bill by its ID.
   */
  getBillById() {
    this.billService.getBill(this.billId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.isRejected = (res.body.status === "R");
        this.noOfWorkflowLevel = res.body.totalLevels;
        this.currentLevel = res.body.currentLevel;
        res.body.billDate = new Date(res.body.billDate).toLocaleDateString();
        res.body.dueDate = new Date(res.body.dueDate? res.body.dueDate: new Date()).toLocaleDateString();
        this.billMst = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
