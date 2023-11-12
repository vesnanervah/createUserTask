import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Input, Output } from '@angular/core';
import { ValidatedField } from '../validated-field';
import { TypedEventArgs, ValidationEventArgs } from './events-args';

@Component({
  selector: 'app-base-validated-input',
  templateUrl: './base-validated-input.component.html',
  styleUrls: ['./base-validated-input.component.scss']
})
export class BaseValidatedInputComponent {
  @Input() data: ValidatedField | undefined;
  @Input() validationFn: ((value: string) => boolean) | undefined;
  @Output() validation: EventEmitter<ValidationEventArgs> = new EventEmitter();
  @Output() typed: EventEmitter<TypedEventArgs> = new EventEmitter();
  @ViewChild('inputElem') inputElem: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('errorElem') errorElem: ElementRef<HTMLElement> | undefined;


  handleKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  handleKeyUp(event: KeyboardEvent, value: string) {
    if (event.key === ' ') {
      event.preventDefault();
      return;
    }
    const valid = this.validationFn ? this.validationFn(value) : true;
    value.length === 0 || valid ? this.errorElem?.nativeElement.classList.add('hidden') : this.errorElem?.nativeElement.classList.remove('hidden') 
    this.validation.emit({name: this.data?.name as string, result: valid});
    this.typed.emit({ name: this.data?.name as string, result: value});
  }

}
