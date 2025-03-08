import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../products-list.component';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { MinusButtonComponent } from '../../../components/button/minus-button.component';
import { PlusButtonComponent } from '../../../components/button/plus-button.component';
import { Router } from '@angular/router';
import { PortalService } from '../../../services/portal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, MinusButtonComponent, PlusButtonComponent],
  template: `
    <div
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative"
    >
      <div class="mx-auto">
        <img
          [src]="'http://localhost:5053' + product().imgUrl"
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

  productService = inject(PortalService);
  userAuth = inject(AuthService);
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
    console.log('Product:', this.product());
    if (this.stock() > 0) {
      this.cartService.addToCart(this.product(), this.stock()).subscribe(() => {
        console.log('REACHED HERE');
        // Update the product stock only after a successful API call
        const updatedStock = this.product().stock! - this.stock();
        const updatedProduct = new FormData();
        updatedProduct.append('stock', updatedStock.toString());
        updatedProduct.append('imgUrl', this.product().imgUrl);
        console.log(updatedProduct);

        this.productService
          .updateProduct(this.product().productId, updatedProduct)
          .subscribe(() => {
            this.stock.set(0);
            this.router.navigate(['/cart']);
          });
      });
    } else {
      var stock = this.product().stock || 0;
      if (stock > 0) {
        this.cartService
          .addToCart(this.product(), this.stock() + 1)
          .subscribe(() => {
            // Update the stock again if only one is added
            const updatedStock = stock - 1;
            const updatedProduct = new FormData();
            updatedProduct.append('stock', updatedStock.toString());
            updatedProduct.append('imgUrl', this.product().imgUrl);

            this.productService
              .updateProduct(this.product().productId, updatedProduct)
              .subscribe(() => {
                this.stock.set(0);
                this.router.navigate(['/cart']);
              });
          });
      }
    }
  }
}
