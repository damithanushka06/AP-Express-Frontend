import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BillMasterDto} from "../../shared/dto/BillMasterDto";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {BillService} from "../../../services/bill/bill.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bill-approve',
  templateUrl: './bill-approve.component.html',
  styleUrls: ['./bill-approve.component.scss']
})
export class BillApproveComponent implements OnInit {
  @Input() billId: any;
  @Output() success = new EventEmitter();
  public billMst: BillMasterDto = new BillMasterDto();
  isRejected: boolean = false;
  currentLevel!: number;
  noOfWorkflowLevel!: number;

  constructor(public billService: BillService, public notificationService: NotificationService, public router: Router) {

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

  approveBill() {
    this.billService.approveBill(this.billId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.BILL_APPROVED_SUCCESS);
        this.success.emit();
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
