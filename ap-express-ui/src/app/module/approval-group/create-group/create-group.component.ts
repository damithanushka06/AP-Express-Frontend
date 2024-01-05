import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {AppGroupService} from "../../../services/approvalGroup/app-group.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  public createApprovalGroupForm!: FormGroup;
  @Input() approvalGroupId: any;
  @Input() isEditGroup = false;
  @Output() public success: any = new EventEmitter();

  ngOnInit(): void {
    this.createApprovalGroupForm =
      this.formBuilder.group({
        name: [null, Validators.required],
      });
    if (this.isEditGroup) {
      this.getApprovalGroupData();
    }
  }

  constructor(public formBuilder: FormBuilder, public approvalGroupService: AppGroupService,
              public notificationService: NotificationService, public router: Router) {
  }

  get f() {
    return this.createApprovalGroupForm.controls
  }

  /**
   * this method can be used to create user
   */
  create() {
    this.approvalGroupService.createGroup(this.createApprovalGroupForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.APP_GROUP_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/approval-group/group-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to update user
   */
  updateApprovalGroup() {
    this.createApprovalGroupForm.addControl('id', this.formBuilder.control(''));
    this.createApprovalGroupForm.get('id')?.patchValue(this.approvalGroupId);
    this.approvalGroupService.updateApprovalGroup(this.createApprovalGroupForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.APP_GROUP_UPDATED_SUCCESS);
        this.success.emit();
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to update user
   */
  getApprovalGroupData() {
    this.approvalGroupService.getApprovalGroupById(this.approvalGroupId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.createApprovalGroupForm.patchValue(res.body);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

}
