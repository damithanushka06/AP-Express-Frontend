import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-approve-buttons',
  templateUrl: './approve-buttons.component.html',
  styleUrls: ['./approve-buttons.component.scss']
})
export class ApproveButtonsComponent {
  @Input() isRejected: boolean = false;
  @Input() currentLevel!: number;
  @Input() numberOfWorkFlowLevel!: number;


  @Output() approve: EventEmitter<any> = new EventEmitter<any>();
  @Output() approveAndFinalize: EventEmitter<any> = new EventEmitter<any>();
  @Output() reject: EventEmitter<any> = new EventEmitter<any>();
}
