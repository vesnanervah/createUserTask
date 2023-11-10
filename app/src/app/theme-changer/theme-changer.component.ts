import { Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss']
})
export class ThemeChangerComponent {

  private checked = false

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter();

  handleTogglerClick(toggling: HTMLSpanElement) {
    if (this.checked) {
      toggling.classList.remove('right');
    } else {
      toggling.classList.add('right');
    }
    this.checked = !this.checked;
    this.themeChanged.emit(this.checked);
  }


}
