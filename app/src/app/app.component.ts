import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  handleThemeChange(checked: boolean) {
    checked ? document.body.classList.add('black-theme') : document.body.classList.remove('black-theme');
  }
}
