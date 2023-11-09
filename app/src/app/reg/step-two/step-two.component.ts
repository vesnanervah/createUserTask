import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent {

  constructor(
    private router: Router 
  ) {

  }

  handleEnterClick() {
    this.router.navigateByUrl('registration/stepThree');
  }

}
