import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-minus-button',
  imports: [],
  template: `
    <button
      class=" text-white font-bold bg-red-400 w-full px-5 py-2 rounded-xl shadow-md hover:bg-red-500"
      (click)="btnClicked.emit()"
    >
      <span class="text-md">{{ label() }}</span>
    </button>
  `,
  styles: ``,
})
export class MinusButtonComponent {
  label = input<string>();

  btnClicked = output();
}
