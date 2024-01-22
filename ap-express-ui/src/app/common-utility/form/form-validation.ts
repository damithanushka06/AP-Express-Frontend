import { FormGroup, AbstractControl, Validators } from '@angular/forms';

export function FormValidation(form: FormGroup) {
  // Iterate through all controls in the form
  Object.keys(form.controls).forEach((controlName: string) => {
    const control: any = form.get(controlName);

    // Check if the control has the 'required' validator
    if (control.validator && control.validator({} as AbstractControl)?.['required']) {
      // Mark the control as dirty
      control.markAsDirty();

      // Set a custom error message (you can customize this part)
      control.setErrors({ required: true });
    }
  });
}
