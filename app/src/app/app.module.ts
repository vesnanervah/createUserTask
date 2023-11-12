import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegComponent } from './reg/reg.component';
import { StepOneComponent } from './reg/step-one/step-one.component';
import { StepTwoComponent } from './reg/step-two/step-two.component';
import { ThemeChangerComponent } from './theme-changer/theme-changer.component';
import { StepThreeComponent } from './reg/step-three/step-three.component';
import { HttpClientModule } from '@angular/common/http';
import { BaseValidatedInputComponent } from './reg/base-validated-input/base-validated-input.component';

@NgModule({
  declarations: [
    AppComponent,
    RegComponent,
    StepOneComponent,
    StepTwoComponent,
    ThemeChangerComponent,
    StepThreeComponent,
    BaseValidatedInputComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
