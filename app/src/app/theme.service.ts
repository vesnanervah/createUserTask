import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = 'default';
  private exhistingThemes = ['default', 'dark'];

  setTheme(newTheme: string) {
    if (!this.exhistingThemes.includes(newTheme)) {
      console.log('Unknown theme. Do nothing.');
      return
    }

    this.theme = newTheme;
  }

  getThemeUrl(): string {
    return `./${this.theme}.css`;
  }

  constructor() { }
}
