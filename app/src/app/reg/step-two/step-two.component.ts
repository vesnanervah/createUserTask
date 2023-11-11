import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import BaseStep from '../base-step';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent extends BaseStep {
  @ViewChild('elemRef') elemRef: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private router: Router 
  ) {
    super();
  }

  handleEnterClick() {
    this.handleStepComplete(this.elemRef?.nativeElement as HTMLDivElement, () => this.router.navigateByUrl('registration/stepThree'));
  }


}
