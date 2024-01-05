import {Component, ViewChild} from '@angular/core';
import {ModalComponent, ModalService} from "@coreui/angular";
import {NotificationService} from "../../../services/notification/notification.service";
import {HttpResponseConstant} from "../../../constant/http-response-constant";
import Swal from "sweetalert2";
import {HttpResponseMessage} from "../../../constant/http-response-message";
import {VendorService} from "../../../services/vendor/vendor.service";

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent {
  public vendorList: any[] = [];
  public vendorSetting: any = {};
  public isEditVendor = false;
  public vendorId: any;
  public i!: number;
  public vendor: any;
  items = [
    {label: 'Edit', icon: 'pi pi-pencil', id: 3},
    {label: 'Delete', icon: 'pi pi-trash', id: 4},
  ];

  @ViewChild('staticBackdropModal')
  public staticBackdropModal!: ModalComponent;


  constructor(public vendorService: VendorService, public notificationService: NotificationService,
              private modalService: ModalService) {
    this.getAllVendorList();
    this.getVendorSetting();
  }

  /**
   * this method can be used to get all vendors from back end service
   */
  getAllVendorList() {
    this.vendorService.getAllVendorList().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.vendorList = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, (error: string) => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get all vendors from back end service
   */
  getVendorSetting() {
    this.vendorService.getSetting().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        this.vendorSetting = res.body;
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, (error: string) => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to delete vendor
   * @param id to vendor id
   */
  deletevendor(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete the selected vendor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.vendorService.deleteVendor(id).subscribe((res: any) => {
          if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
            this.notificationService.successNotificationDelete(HttpResponseMessage.VENDOR_DELETED_SUCCESS);
            this.getAllVendorList();
          } else {
            this.notificationService.warningNotification(res.body.message);
          }
        }, (error: string) => {
          this.notificationService.errorNotification(error);
        });
      }
    });
  }

  /**
   * show vendor edit modal
   */
  showModal() {
    debugger
    this.modalService.toggle({show: true, id: 'vendorList', modal: this.staticBackdropModal});
    this.isEditVendor = true;
  }

  /**
   * close vendor edit modal
   */
  hideModal() {
    this.modalService.toggle({show: false, id: 'vendorList', modal: this.staticBackdropModal});
    this.isEditVendor = false;
  }
}
