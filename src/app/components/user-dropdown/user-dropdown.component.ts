import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dropdown',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="relative z-50">
      <button
        (click)="toggleDropdown()"
        class="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-md hover:opacity-90"
      >
        <span>Account</span>
        <i class="pi pi-user"></i>
      </button>

      <div
        *ngIf="isOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
      >
        <!-- <a routerLink="/profile" class="block px-4 py-2 hover:bg-gray-100"
          >Profile</a
        >
        <a routerLink="/settings" class="block px-4 py-2 hover:bg-gray-100"
          >Settings</a
        > -->
        <hr />
        <button
          (click)="logout.emit(); closeDropdown()"
          class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .relative {
        position: relative;
      }
      .absolute {
        position: absolute;
      }
      .w-48 {
        width: 12rem;
      }
      .right-0 {
        right: 0;
      }
      .mt-2 {
        margin-top: 0.5rem;
      }
      .border {
        border: 1px solid #ccc;
      }
      .shadow-lg {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class UserDropdownComponent {
  isOpen = false;
  @Output() logout = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
