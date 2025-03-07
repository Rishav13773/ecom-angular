import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../products-list.component';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { MinusButtonComponent } from '../../../components/button/minus-button.component';
import { PlusButtonComponent } from '../../../components/button/plus-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, MinusButtonComponent, PlusButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative"
    >
      <div class="mx-auto">
        <img
          [src]="product().image"
          class="w-[200px] h-[100px] object-contain"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold text-center mb-2">{{
          product().name
        }}</span>
        <span class="text-sm text-center"> {{ '₹' + product().price }}</span>

        <div class="flex items-center justify-center gap-2 mt-2">
          <app-minus-button label="-" (btnClicked)="decreaseQuantity()" />
          <span class="font-bold">{{ stock() }}</span>
          <app-plus-button label="+" (btnClicked)="increaseQuantity()" />
        </div>

        <div class="flex justify-center">
          <app-primary-button
            class="mt-3"
            label="Buy Now"
            (btnClicked)="addToCart()"
          />
        </div>
      </div>

      <span
        class="absolute top-2 right-3 text-sm font-bold"
        [class]="product().stock ? 'text-green-500' : 'text-red-500'"
      >
        @if (product().stock) {
        {{ product().stock }} left } @else { Out of stock }
      </span>
    </div>
  `,
  styles: ``,
})
export class ProductCardComponent {
  constructor(private router: Router) {}

  cartService = inject(CartService);
  product = input.required<Product>();
  stock = signal(0);

  increaseQuantity() {
    if (this.stock() < this.product().stock!) {
      this.stock.set(this.stock() + 1);
    }
  }

  decreaseQuantity() {
    if (this.stock() > 0) {
      this.stock.set(this.stock() - 1);
    }
  }

  addToCart() {
    if (this.stock() > 0) {
      this.cartService.addToCart(this.product(), this.stock());
      this.stock.set(0);
      this.router.navigate(['/cart']);
    } else {
      var stock = this.product().stock || 0;
      if (stock > 0) {
        this.cartService.addToCart(this.product(), this.stock() + 1);
        this.stock.set(0);
        this.router.navigate(['/cart']);
      }
    }
  }
}
