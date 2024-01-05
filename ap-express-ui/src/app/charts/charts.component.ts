import {Component} from '@angular/core';
import {BillService} from "../services/bill/bill.service";
import {HttpResponseConstant} from "../constant/http-response-constant";
import {NotificationService} from "../services/notification/notification.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  public approvedBillData: any [] = [];
  public approvedPOData: any [] = [];

  constructor(public billService: BillService, public notificationService: NotificationService) {
    this.getApprovedBillChartData();
    this.getApprovedPOChartData();
  }


  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  chartBarData: any = {};
  chartLineData: any = {};

  /**
   * this method can be used to get approved bill chart data
   */
  getApprovedBillChartData() {
    this.billService.getApprovedBillChartData().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        // Assuming the provided response is stored in a variable called 'response'
        const response: any = res.body;

        // Create an array to hold the mapped data
        const mappedData = Array(12).fill(0);

        // Map the 'noOfBills' to the corresponding month in the 'mappedData' array
        response.forEach((item: { month: number; noOfItems: any; }) => {
          const monthIndex = item.month - 1;
          mappedData[monthIndex] = item.noOfItems;
        });

        this.approvedBillData = mappedData;
        this.chartBarData = {
          labels: [...this.months].slice(0, 12),
          datasets: [
            {
              label: 'Approved Bills',
              backgroundColor: '#f87979',
              data: this.approvedBillData
            }
          ]
        };
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

  /**
   * this method can be used to get approved po chart data
   */
  getApprovedPOChartData() {
    this.billService.getApprovedPOChartData().subscribe((res: any) => {
      if (res.status === HttpResponseConstant.HTTP_RESPONSE_SUCCESS) {
        // Assuming the provided response is stored in a variable called 'response'
        const response: any = res.body;

        // Create an array to hold the mapped data
        const mappedData = Array(12).fill(0);

        // Map the 'noOfBills' to the corresponding month in the 'mappedData' array
        response.forEach((item: { month: number; noOfItems: any; }) => {
          const monthIndex = item.month - 1;
          mappedData[monthIndex] = item.noOfItems;
        });

        this.approvedPOData = mappedData;
        this.chartLineData = {
          labels: [...this.months].slice(0, 12),
          datasets: [
            {
              label: 'Bills',
              backgroundColor: 'rgba(220, 220, 220, 0.2)',
              borderColor: 'rgba(220, 220, 220, 1)',
              pointBackgroundColor: 'rgba(220, 220, 220, 1)',
              pointBorderColor: '#fff',
              data: this.approvedBillData
            },
            {
              label: 'Purchase Orders',
              backgroundColor: 'rgba(151, 187, 205, 0.2)',
              borderColor: 'rgba(151, 187, 205, 1)',
              pointBackgroundColor: 'rgba(151, 187, 205, 1)',
              pointBorderColor: '#fff',
              data: this.approvedPOData
            }
          ]
        };
      } else {
        this.notificationService.warningNotification(res.body.message);
      }
    }, error => {
      this.notificationService.errorNotification(error);
    });
  }

}
