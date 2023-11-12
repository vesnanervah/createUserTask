import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BaseStep from '../base-step';
import { EmailConfirmService } from 'src/app/email-confirm.service';
import { UserRegData } from '../user-reg-data';
import { ValidatedFields } from '../validated-field';
import { TypedEventArgs, ValidationEventArgs } from '../base-validated-input/events-args';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent extends BaseStep {
  @ViewChild('elemRef') elemRef: ElementRef<HTMLDivElement> | undefined;
  private userData: UserRegData | undefined;

  validatedFields: ValidatedFields = {
    code: {
      name: 'code',
      ref: undefined,
      value: '',
      valid: false,
      errorMsg: "Incorrect code",
      placeholder: 'Confirmation code',
      inputType: 'text'
    },
  };

  constructor(
    private router: Router,
    private rout: ActivatedRoute,
    private emailConfirm: EmailConfirmService
  ) {
    super();
    this.rout.parent?.data.subscribe((routData) => {
      this.userData = routData['userData'];
    })
  }

  handleFieldTyped(eventArgs: TypedEventArgs) {
    this.validatedFields[eventArgs.name].value = eventArgs.result;
    console.log(this.validatedFields[eventArgs.name].value)
  }

  handleFieldValidation(eventArgs: ValidationEventArgs) {
    this.validatedFields[eventArgs.name].valid = eventArgs.result;
  }

  handleEnterClick(event: Event) {
    event.preventDefault();
    if(this.validatedFields['code'].value.length === 0) {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
      return;
    }
    try {
      this.emailConfirm.enterCode(this.userData?.email as string, this.validatedFields['code'].value).subscribe((data) => {
        this.handleStepComplete(this.elemRef?.nativeElement as HTMLDivElement, () => this.router.navigateByUrl('registration/stepThree'));
      });
    } catch {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
    }
  }


}
