import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="
        customClass ||
        'bg-blue-500 w-40 text-white border px-5 py-2 rounded-xl shadow-md hover:opacity-90'
      "
      (click)="btnClicked.emit()"
    >
      <span class="text-md">{{ label }}</span>
    </button>
  `,
})
export class PrimaryButtonComponent {
  @Input() label!: string;
  @Input() customClass?: string;

  @Output() btnClicked = new EventEmitter<void>();
}
