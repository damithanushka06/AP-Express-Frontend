import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {NotificationService} from "../../../services/notification/notification.service";
import {ItemService} from "../../../services/item/item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit{

  createItemForm!: FormGroup;
  categoryList: DropdownDto = new DropdownDto();
  uomList: DropdownDto = new DropdownDto();
  @Output() success = new EventEmitter();

  @Input()isEdit: any;
  @Input() itemId!: number;



  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
             private itemService: ItemService, public router: Router) { }

  ngOnInit(): void {
    this.createItemForm = this.formBuilder.group({
      name: [null, Validators.required],
      number: [null, Validators.required],
      categoryId: [null, Validators.required],
      uomId: [null, Validators.required],
      unitPrice: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getUOMList();
    this.getCategoryList();
    if (this.isEdit) {
      this.getItemData();
    }
  }

  /**
   * return controllers of the form
   */
  get f() {
    return this.createItemForm.controls;
  }

  /**
   * this method used for submit item data
   */
  submitItemData() {
    this.itemService.createItem(this.createItemForm.value).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.notificationService.successNotification(HttpResponseMessage.USER_CREATE_SUCCESS);
        this.router.navigateByUrl('/home/item/item-list');
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method used for update item data
   */
  updateItemData() {
    this.createItemForm.addControl('id', this.formBuilder.control(''));
    this.createItemForm.get('id')?.patchValue(this.itemId);
    this.itemService.updateItem(this.createItemForm.value).subscribe((res: any) => {
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
  getItemData() {
    this.itemService.getItem(this.itemId).subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.createItemForm.patchValue(res.body);
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }


  /**
   * this method can be used to reset item form data
   */
  resetItemForm() {
    this.createItemForm.reset();
    if(this.isEdit){
      this.getItemData();
    }
  }

  /**
   * this method can be used to get uom list
   */
  getUOMList() {
    this.itemService.getUOMList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.uomList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get category list
   */
  getCategoryList() {
    this.itemService.getCategoryList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.categoryList.data = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }
}
