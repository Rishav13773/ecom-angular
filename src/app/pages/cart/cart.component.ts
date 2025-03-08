import { Component, inject, computed, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    HeaderComponent,
    ButtonComponent,
    PrimaryButtonComponent,
  ],
  template: `
    <app-header />

    <div class="p-6 flex flex-col gap-6 mb-20">
      <!-- Empty Cart Message -->
      @if (cartIsEmpty()) {
      <div
        class="text-center text-gray-500 text-lg flex justify-center flex-col items-center"
      >
        <img class="w-96 h-96" src="empty.png" alt="cart" />
        <p>Your cart is empty.</p>
        <p>Add some products to continue.</p>
      </div>
      } @else {
      <div class="flex flex-col lg:flex-row gap-6 md:mx-40">
        <!-- Address fill Section -->
        <div class="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/5">
          <h2 class="text-2xl font-semibold mb-4">Please enter your address</h2>
          <form class="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full name (First and Last name)"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Mobile number"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Pincode"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Flat, House no., Building, Company, Apartment"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Area, Street, Sector, Village"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Landmark"
              class="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              placeholder="Town/City"
              class="p-2 border rounded-md w-full"
            />
            <app-primary-button label="Continue" />
          </form>
        </div>

        <!-- Order Summary Section -->
        <div class="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/5">
          <app-order-summary [cart]="cart()" />
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.getCart();
  // cart = signal<any[]>([]); // Signal to store cart items

  // ngOnInit(): void {
  //   this.cartService.getCartById().subscribe({
  //     next: (cartItems) => {
  //       this.cart.set(cartItems);
  //       console.log('Cart updated:', cartItems);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching cart:', error);
  //     },
  //   });
  // }
  cartIsEmpty = computed(() => this.cart().length === 0);
}
