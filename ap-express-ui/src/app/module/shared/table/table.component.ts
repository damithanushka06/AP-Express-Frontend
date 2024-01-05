// Import necessary modules and decorators from Angular core
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppEnumConstants} from "../../../enum/app-enum-constants";

// Component decorator with selector, template, and style URLs
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
// TableComponent class implementing OnInit interface
export class TableComponent implements OnInit {
  // Loading indicator flag
  loading: boolean = false;

  // Array to hold columns for PDF export
  exportColumns!: any[];

  // Array to hold selected products
  selectedProducts: any[] = [];

  // Array to hold common items for context menu
  commonItems: any[] = [];

  objectId: any;

  // Input properties to receive data, settings, and items from parent component
  @Input() public data: any = [];
  @Input() public setting: any[] = [];
  @Input() public items: any[] = [];

  // Output events to emit values to parent component
  @Output() public id: EventEmitter<any> = new EventEmitter();
  @Output() public edit: EventEmitter<any> = new EventEmitter();
  @Output() public editAndResubmit: EventEmitter<any> = new EventEmitter();
  @Output() public delete: EventEmitter<any> = new EventEmitter();
  @Output() public active: EventEmitter<any> = new EventEmitter();
  @Output() public inactive: EventEmitter<any> = new EventEmitter();
  @Output() public detailView: EventEmitter<any> = new EventEmitter();
  @Output() public download: EventEmitter<any> = new EventEmitter();
  @Output() public approve: EventEmitter<any> = new EventEmitter();

  // Constructor for the TableComponent
  constructor() {
  }

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    // Map settings to exportColumns array for PDF export
    this.exportColumns = this.setting?.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    // Initialize commonItems array with context menu options
    this.commonItems = [
      {
        label: 'Approve & Reject',
        icon: 'pi pi-check',
        status: AppEnumConstants.STATUS_PENDING,
        id: 1,
        command: () => this.approve.emit()
      },
      {
        label: 'Edit & Resubmit',
        icon: 'pi pi-comments',
        id: 2,
        status: AppEnumConstants.STATUS_REJECT,
        command: () => this.editAndResubmit.emit()
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        id: 3,
        status: AppEnumConstants.STATUS_COMMON,
        command: () => this.edit.emit()
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        id: 4,
        status: AppEnumConstants.STATUS_COMMON,
        command: () => this.delete.emit()
      },
      {
        label: 'Active',
        icon: 'pi pi-eye',
        id: 5,
        status: AppEnumConstants.STATUS_INACTIVE,
        command: () => this.active.emit()
      },
      {
        label: 'Inactive',
        icon: 'pi pi-eye-slash',
        status: AppEnumConstants.STATUS_ACTIVE,
        id: 6,
        command: () => this.inactive.emit()
      },
      {
        label: 'Download',
        icon: 'pi pi-download',
        status: AppEnumConstants.STATUS_COMMON,
        id: 7,
        command: () => this.download.emit()
      },
      {
        label: 'Delete',
        icon: 'pi pi-download',
        status: AppEnumConstants.STATUS_VOID,
        id: 7,
        command: () => this.delete.emit()
      },
    ];

    // Filter from commonItems based on the items array
    this.items = this.commonItems.filter(commonItem =>
      this.items.some(item => item.id === commonItem.id)
    );
  }

  // Method to export data to PDF
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default();
        (doc as any).autoTable(this.exportColumns, this.data);
        doc.save('products.pdf');
      });
    });
  }

  // Method to export data to Excel
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.data);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ["data"]};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  // Method to save Excel file
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  /**
   * method can be used to get the status name based on back end response
   * @param status is back end status
   */
  getStatus(status: any): any {
    switch (status) {
      case AppEnumConstants.STATUS_PENDING: {
        return AppEnumConstants.LABEL_PENDING;
      }
      case AppEnumConstants.STATUS_REJECT: {
        return AppEnumConstants.LABEL_REJECT;
      }
      case AppEnumConstants.STATUS_APPROVED: {
        return AppEnumConstants.LABEL_APPROVED;
      }
      case AppEnumConstants.STATUS_VOID: {
        return AppEnumConstants.LABEL_VOID;
      }
    }
  }

  /**
   * Change action button array list according to status
   * @param obj to active object
   */
  actionButtonList(obj: any) {
    return this.items.filter(item => this.isActionMatch(item, obj['status']));
  }

  private isActionMatch(objElement: any, status: string): boolean {
    return (objElement.status === status || objElement.status === AppEnumConstants.STATUS_COMMON);
  }

  clickOnActionButton(rowData: any) {
    this.id.emit(rowData);
  }
}
