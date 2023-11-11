import {  Component, ViewChild } from '@angular/core';
import { allowedChars } from './allowed-chars';
import { Validations } from '../validations';
import { Router } from '@angular/router';
import BaseStep from '../base-step';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})

export class StepOneComponent extends BaseStep {
  @ViewChild('stepOneRef') elemRef: ElementRef<HTMLDivElement> | undefined;
  private validations: Validations = {
    mail: false,
    password: false,
    repeatPassword: false
  }
  emailValidationTxt = "Email should be in example@mail.ru format";
  passwordValidationTxt = 'Allowed only a-z, A-Z letters and 0-9 numbers';
  passwordRepeatValidationTxt = 'Passwords should be the same';

  constructor(
    private router: Router
  ) {
    super();
   }
  
  handleSubmitClick(event: Event): void {
    event.preventDefault();
    if (Object.values(this.validations).every((val) => val === true)) {
      this.handleStepComplete(this.elemRef?.nativeElement as HTMLDivElement, () => this.moveToStepTwo());
    } else {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
    }
  }


  validateInput(input: HTMLInputElement, errorLabel: HTMLDivElement, compareFn: (typed: string) => boolean, validationsKey: string) {
    if (input.value.length === 0) {
      errorLabel.classList.add('hidden');
      this.validations[validationsKey] = false;
    }
    else if (compareFn(input.value)) {
      errorLabel.classList.add('hidden');
      this.validations[validationsKey] = true;
    } else {
      errorLabel.classList.remove('hidden');
      this.validations[validationsKey] = false;
    }
  }

  validatePasswordRepeat(passwordInput: HTMLInputElement, passwordRepeatInput: HTMLInputElement, valiadationErrorElem: HTMLDivElement) {
    if (passwordInput.value.length === 0) {
      valiadationErrorElem.classList.add('hidden');
      this.validations['repeatPassword'] = false;
    }
    else if (passwordInput.value === passwordRepeatInput.value ) {
      valiadationErrorElem.classList.add('hidden');
      this.validations['repeatPassword'] = true;
    } else {
      valiadationErrorElem.classList.remove('hidden');
      this.validations['repeatPassword'] = false;
    }
  }

  compareToMail(typed: string): boolean {
    return typed.includes('@') &&
      typed.slice(typed.indexOf('@')).includes('.') &&
      typed.slice(typed.indexOf('@')).slice(typed.slice(typed.indexOf('@')).indexOf('.'))
        .length > 1
  }

  compareToPassword(typed: string): boolean {
    return [...(typed.toUpperCase())].every((char) => allowedChars.includes(char));
  }

  private moveToStepTwo() {
    this.router.navigateByUrl('registration/stepTwo');
  }
}
