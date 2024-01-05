import {Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None, // Disable View Encapsulation


  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() name!: string;
  @Input() dateValue!: string;
  @Input() formGroup!: FormGroup;
  @Input() formControlFromParent!: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  value: any;
  disabled!: boolean;
  isInvalid: boolean = false; // Track the validity state
  touched: boolean = false; // Track the touched state
  dirty: boolean = false; // Track the dirty state
  onChange: any = () => {
    alert(this.dateValue)
  };
  onTouch: any = () => {};

  // Writes the value from the form model into the view
  writeValue(value: any): void {
    this.value = value;
    this.onChange(this.value);
  }

  // Registers a callback function that will be triggered when the value of the input changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.checkValidity(); // Call checkValidity() when the value changes
  }

  // Registers a callback function that will be triggered when the input is touched
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Sets the disabled state of the input
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handles the change event of the input element

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    this.value = selectedDate;
    this.onChange(this.value);
    this.onTouch();
    this.onSelect.emit(this.value);
    this.checkValidity(); // Call checkValidity() method on date change
  }

  // Method to check the validity of the control
  checkValidity(): void {
    if(this.formControlFromParent){
      this.isInvalid = !this.disabled && this.onChange && this.formControlFromParent.invalid;
      this.dirty = this.onChange && this.formControlFromParent.dirty;
    }
  }

  // Method to get the CSS classes for the input element

  getInputClasses(): string {
    let classes = '';
    if (this.isInvalid) {
      classes += 'ng-invalid ';
    }
    if (this.touched) {
      classes += 'ng-touched ';
    }
    if (this.dirty) {
      classes += 'ng-dirty';
    }
    return classes.trim();
  }
}
