import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { StepOneComponent } from './reg/step-one/step-one.component';
import { StepTwoComponent } from './reg/step-two/step-two.component';
import { StepThreeComponent } from './reg/step-three/step-three.component';
import { UserRegData } from './reg/user-reg-data';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'registration', 
    pathMatch: 'full',
  },
  {
    path: 'registration', 
    component: RegComponent,
    children: [
      {
        path: '',
        redirectTo: 'stepOne',
        pathMatch: 'full'
      },
      {
        path:'stepOne',
        component: StepOneComponent
      },
      {
        path: 'stepTwo',
        component: StepTwoComponent
      },
      {
        path: 'stepThree',
        component: StepThreeComponent
      }
    ], data:{
      userData: {} as UserRegData
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
