import { Component, computed, inject, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [PrimaryButtonComponent, CartItemComponent],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Your Order</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-lg font-bold">{{ '₹ ' + totalPrice() }}</span>
        </div>

        <!-- Loop through extracted cart items -->
        @for (item of cartItems(); track item.product.productId) {
        <app-cart-item [item]="item" />
        }

        <!-- <app-primary-button label="Proceed to checkout" /> -->
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  @Input() cart: any = {}; //  receive the cart object

  cartItems = computed(() => this.cart?.$values ?? []); // Extracts $values array

  totalPrice = computed(() =>
    this.cartItems().reduce(
      (total: any, item: any) => total + item.totalPrice,
      0
    )
  );
}
