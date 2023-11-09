import { Component, OnInit } from '@angular/core';
import { RandomUser } from 'src/app/random-user';
import { RandomUserService } from 'src/app/random-user.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent {

  user: RandomUser | undefined;

  constructor(private randomUserService: RandomUserService) {
    this.randomUserService.getRandomUser().subscribe((data) => {
      this.user = data as RandomUser;
    })
  }



}
