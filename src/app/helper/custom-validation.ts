import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
export function passwordMatchingValidatior(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  };
}

export const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};

export function uniqueText(
  listText: string[],
  currentText: string = '',
  isRegister: boolean = false
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = control.value;
    const condition = isRegister
      ? listText.includes(text)
      : listText.includes(text) && text !== currentText;
    return condition ? { existing: true } : null;
  };
}

export function checkIfMatchingPasswords(
  passwordKey: string,
  passwordConfirmationKey: string
) {
  return (group: FormGroup) => {
    const passwordInput = group.controls[passwordKey];
    const passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({ notEquivalent: true });
    } else {
      return passwordConfirmationInput.setErrors(null);
    }
  };
}
