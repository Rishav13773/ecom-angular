import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { AuthService } from '../../services/auth.service';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, UserDropdownComponent],
  template: `
    <div
      class="bg-slate-100 px-4 py-3 shadow-md flex justify-between items-center"
    >
      <div class="flex items-center gap-3">
        <img class="w-14 h-14" src="logo.png" alt="logo" />
        <button class="text-2xl font-bold" routerLink="">My Store</button>
      </div>

      <div class="flex justify-between items-center gap-2">
        @if (!isLoggedIn()) {
        <app-primary-button
          customClass="bg-white text-blue-500 font-bold w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90"
          label="Login"
          routerLink="/login"
        />
        }@else {
        <!-- <app-primary-button
          customClass="bg-white text-blue-500 font-bold w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90"
          label="Logout"
          (click)="logout()"
        /> -->
        <app-user-dropdown (logout)="logout()"></app-user-dropdown>
        }

        <a class="relative" href="" routerLink="/cart">
          <span
            class="absolute bg-red-600 rounded-full p-1 text-white text-xs left-4 bottom-5"
            >{{ cartLength() }}</span
          >
          <i
            class="pi pi-shopping-bag"
            style="font-size: 2rem; color:  #708090"
          ></i>
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}
  cartService = inject(CartService);
  cart: any = signal<any[]>([]);
  cartLength = signal<number>(0);
  ngOnInit(): void {
    this.cartService.getCartById().subscribe({
      next: (cartItems: any) => {
        this.cart.set(cartItems);
        console.log('Cart updated:', cartItems.$values.length);
        this.cartLength.set(cartItems.$values.length);
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      },
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  }
}
