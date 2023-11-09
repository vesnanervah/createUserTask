import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { allowedChars } from './allowed-chars';
import { Validations } from '../validations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})

export class StepOneComponent {
  private readyToSubmite = false;
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
  ) { }
  
  handleSubmitClick(event: Event): void {
    event.preventDefault();
    if (Object.values(this.validations).every((val) => val === true)) {
      this.moveToStepTwo()
    } else {
      alert('Some of the field are not valid');
    }
  }


  validateInput(input: HTMLInputElement, errorLabel: HTMLDivElement, compareFn: (typed: string) => boolean, validationsKey: string) {
    if (compareFn(input.value)) {
      errorLabel.classList.add('hidden');
      this.validations[validationsKey] = true;
    } else {
      errorLabel.classList.remove('hidden');
      this.validations[validationsKey] = false;
    }
  }

  validatePasswordRepeat(passwordInput: HTMLInputElement, passwordRepeatInput: HTMLInputElement, valiadationErrorElem: HTMLDivElement) {
    if (passwordInput.value === passwordRepeatInput.value ) {
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