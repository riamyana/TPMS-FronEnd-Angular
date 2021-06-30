import { AbstractControl, ValidatorFn } from "@angular/forms";

export function alwaysFailValidator(msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        return { 'alwaysFail': { value: msg } };
    };
}

export function rePassword(newPassword: string, msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return control.value == newPassword ? null : { 'retypePass': msg }
    };
}

export function blue(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return control.value?.toLowerCase() === 'blue' ? null : { wrongColor: control.value }
    }
}