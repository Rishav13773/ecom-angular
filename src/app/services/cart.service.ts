import { Injectable, signal } from '@angular/core';
import { Product } from '../pages/products-list/products-list.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<{ product: Product; quantity: number }[]>([]);

  addToCart(product: Product, quantity: number) {
    const existingIndex = this.cart().findIndex(
      (p) => p.product.id === product.id
    );

    if (existingIndex !== -1) {
      let updatedCart = [...this.cart()];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + quantity, // Updates correctly
      };
      this.cart.set(updatedCart);
    } else {
      this.cart.set([...this.cart(), { product, quantity }]);
    }
  }

  removeFromCart(product: Product) {
    this.cart.set(this.cart().filter((p) => p.product.id !== product.id));
  }
}
