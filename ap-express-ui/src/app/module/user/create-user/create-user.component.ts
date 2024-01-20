import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {RoleService} from "../../../services/role/role.service";
import {AppGroupService} from "../../../services/approvalGroup/app-group.service";

function MatchPasswordDirective(control: FormControl): any {
  const password = control.root.get('password');
  const confirmPassword = control.root.get('cPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return {'passwordMismatch': true};
  }
  return null;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public createUserForm!: FormGroup;
  public roleList: DropdownDto = new DropdownDto();
  public approvalGroupList: DropdownDto = new DropdownDto();

  @Input() public isEdit = false;
  @Input() public userid!: number;
  @Output() success = new EventEmitter();

  proPicUrl: any;


  constructor(public formBuilder: FormBuilder, public userService: UserService, public router: Router,
              public roleService: RoleService, public approvalGroupService: AppGroupService,
              public notificationService: NotificationService,private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.createUserForm =
      this.formBuilder.group({
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        cPassword: [null, [Validators.required, MatchPasswordDirective]],
        approvalGroupId: [null,Validators.required],
        employeeNo: [null],
        roleId: [null, Validators.required],
        profilePicture: [],
        file: []
      });
    if (this.isEdit) {
      this.getUserData();
    }
    this.getAllRoleList();
    this.getAllApprovalGroupList();
  }

  get f() {
    return this.createUserForm.controls
  }


  /**
   * this method can be used to create user
   */
  submitUserData() {
    this.createUserForm.removeControl('file');
    this.userService.createUser(this.createUserForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.USER_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/user/user-list');
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
  updateUserData() {
    this.createUserForm.removeControl('file');
    this.createUserForm.addControl('id', this.formBuilder.control(''));
    this.createUserForm.get('id')?.patchValue(this.userid);
    this.userService.updateUser(this.createUserForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.USER_UPDATED_SUCCESS);
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
  getUserData() {
    if(this.userid == undefined){
      return;
    }
    this.createUserForm.get('password')?.clearValidators();
    this.createUserForm.get('cPassword')?.clearValidators();
    this.createUserForm.get('password')?.updateValueAndValidity();
    this.createUserForm.get('cPassword')?.updateValueAndValidity();
    this.userService.getUser(this.userid).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        if(res.body.proPicBase64){
          this.proPicUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + res.body.proPicBase64);
        }
        this.createUserForm.patchValue(res.body);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }


  /**
   * this method can be used to reset user form data
   */
  resetUserForm() {
    this.createUserForm.reset();
    if(this.isEdit){
      this.getUserData();
    }
  }

  /**
   * this method patch binary to form controll name
   * @param $event to change event
   */
  patchProPic($event: any) {
    let file = $event.target.files[0];
    if(file){
      this.createUserForm.patchValue({
        profilePicture: file
      });
    }
  }

  /**
   * this method can be used to get all roles from back end service
   */
  getAllRoleList() {
    this.roleService.getAllUserRole().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.roleList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get all roles from back end service
   */
  getAllApprovalGroupList() {
    this.approvalGroupService.getAllGroup().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.approvalGroupList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
