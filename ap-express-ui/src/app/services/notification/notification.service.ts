import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {HttpResponseMessage} from "../../constant/http-response-message";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * success alert
   * @param message to success message
   */
  successNotification(message:string) {
    Swal.fire('Success!',
       message,
      'success');
  }

  /**
   * warning alert
   * @param message to warning content
   */
  warningNotification(message:string) {
    Swal.fire('Warning!',
      message,
      'warning');
  }

  /**
   * error alert
   * @param message to error content
   */
  errorNotification(message:string) {
    Swal.fire('Error!',
      message,
      'error');
  }

  /**
   * success alert of delete
   * @param message to success message
   */
  successNotificationDelete(message:string) {
    Swal.fire('Removed!', message, 'success');
  }
  constructor() { }
}
