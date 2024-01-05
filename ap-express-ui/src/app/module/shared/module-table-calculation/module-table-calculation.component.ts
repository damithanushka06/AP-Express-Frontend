import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CalculationUtility} from "../../../common-utility/calculation/calculation-utility";

@Component({
  selector: 'app-module-table-calculation',
  templateUrl: './module-table-calculation.component.html',
  styleUrls: ['./module-table-calculation.component.scss']
})
export class ModuleTableCalculationComponent {
  @Input() formGroup!: FormGroup;
  @Input() isShowTax = false;

  public calculationUtility: CalculationUtility = new CalculationUtility();
  constructor() {
  }
}
