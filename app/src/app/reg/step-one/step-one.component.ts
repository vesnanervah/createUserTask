import {  Component, ViewChild } from '@angular/core';
import { allowedChars } from './allowed-chars';
import { ActivatedRoute, Router } from '@angular/router';
import BaseStep from '../base-step';
import { ElementRef } from '@angular/core';
import { EmailConfirmService } from 'src/app/email-confirm.service';
import { ValidatedFields } from '../validated-field';
import { TypedEventArgs, ValidationEventArgs } from '../base-validated-input/events-args';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})

export class StepOneComponent extends BaseStep {
  @ViewChild('stepOneRef') elemRef: ElementRef<HTMLDivElement> | undefined;

  validatedFields: ValidatedFields = {
    email: {
      name: 'email',
      ref: undefined,
      value: '',
      valid: false,
      errorMsg: "Email should be in example@mail.ru format",
      placeholder: 'Email',
      inputType: 'email'
    },
    password: {
      name: 'password',
      ref: undefined,
      value: '',
      valid: false,
      errorMsg: "Allowed only a-z, A-Z letters and 0-9 number",
      placeholder: 'Password',
      inputType: 'password'
    },
    passwordRepeat: {
      name: 'passwordRepeat',
      ref: undefined,
      value: '',
      valid: false,
      errorMsg: 'Passwords should be the same',
      placeholder: 'Repeat password',
      inputType: 'password',
    }
  };

  constructor(
    private router: Router,
    private emailConfirmService: EmailConfirmService,
    private rout: ActivatedRoute
  ) {
    super();
   }
  
  handleSubmitClick(event: Event): void {
    event.preventDefault();
    const validationsFieldValues = Object.values(this.validatedFields);
    if (!validationsFieldValues.every((val) => val.valid)) {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
      return
    }
    const email = this.validatedFields['email'].value;
    const password = this.validatedFields['password'].value
    this.emailConfirmService.initConfirm(email).subscribe((data) => {// колбек хелл реален
      this.rout.parent?.data.subscribe((routParams) => {
        routParams["userData"] = { email, password};
        this.handleStepComplete(this.elemRef?.nativeElement as HTMLDivElement, () => {
          this.moveToStepTwo();
        });
      })
    });
    
  }

  handleFieldTyped(eventArgs: TypedEventArgs) {
    this.validatedFields[eventArgs.name].value = eventArgs.result;
  }

  handleFieldValidation(eventArgs: ValidationEventArgs) {
    this.validatedFields[eventArgs.name].valid = eventArgs.result;
  }

  compareToMail(typed: string): boolean {
    return typed.includes('@') &&
      typed.slice(typed.indexOf('@')).includes('.') &&
      typed.slice(typed.indexOf('@')).slice(typed.slice(typed.indexOf('@')).indexOf('.'))
        .length > 1 // TODO: replace to RegExp
  }

  compareToPassword(typed: string): boolean {
    return [...(typed.toUpperCase())].every((char) => allowedChars.includes(char));
  }

  compareToPasswordRepeat() {
    const password = this.validatedFields['password'].value
    return (typed: string) => typed === password; // Не зря меня дрочили с closures в ролинг скопсе
  }

  private moveToStepTwo() {
    this.router.navigateByUrl('registration/stepTwo');
  }
}
