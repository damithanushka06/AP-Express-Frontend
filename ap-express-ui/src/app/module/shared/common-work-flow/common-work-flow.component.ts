import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DropdownDto} from "../../../dtos/dropdown/dropdown-dto";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-common-work-flow',
  templateUrl: './common-work-flow.component.html',
  styleUrls: ['./common-work-flow.component.scss']
})
export class CommonWorkFlowComponent implements OnInit, AfterViewInit {
  @Input() public approvalUserList: DropdownDto = new DropdownDto();
  @Input() public approvalGroupList: DropdownDto = new DropdownDto();

  @Input() formGroup!: FormGroup;
  @Input() formArray!: any;
  formBuilder!: FormBuilder;

  @Input() public workflowLevels!: number;


  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }
  ngOnInit(): void {
  }
  /**
   * defined account form array
   */
  get workFlowInformation(): FormArray {
    return this.formGroup.get('workflowDetails') as FormArray;
  }


  /**
   * add work flow level
   */
  addApprovalLevel() {
    const workFlow = this.formBuilder.group({
      groupId: [null],
      userId: [null]
    });

    this.workFlowInformation.push(workFlow);
  }

  /**
   * remove approval level
   */
  removeApprovalLevel(index: number) {
    this.workFlowInformation.removeAt(index);
  }

  ngAfterViewInit(): void {
    this.workflowLevels = (this.workflowLevels && this.workflowLevels > 1) ? this.workflowLevels : 1;
    for (let i = 0; i < this.workflowLevels; i++)
      this.addApprovalLevel();
  }
}
