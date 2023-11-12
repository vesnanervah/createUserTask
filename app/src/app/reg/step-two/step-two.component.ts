import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BaseStep from '../base-step';
import { EmailConfirmService } from 'src/app/email-confirm.service';
import { UserRegData } from '../user-reg-data';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent extends BaseStep {
  @ViewChild('elemRef') elemRef: ElementRef<HTMLDivElement> | undefined;
  private userData: UserRegData | undefined;

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

  handleEnterClick(code: string) {
    if(code.length === 0) {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
      return;
    }
    try {
      this.emailConfirm.enterCode(this.userData?.email as string, code).subscribe((data) => {
        this.handleStepComplete(this.elemRef?.nativeElement as HTMLDivElement, () => this.router.navigateByUrl('registration/stepThree'));
      });
    } catch {
      this.handleStepIncomplete(this.elemRef?.nativeElement as HTMLDivElement);
    }
  }


}
