import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../pages/products-list/products-list.component';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { getUser } from '../utils/getUser';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart(); // Fetch cart data once when service is started
  }

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = 'http://localhost:5053/api/cart';
  cart = signal<{ product: Product; quantity: number; cartId: number }[]>([]);

  private loadCart(): void {
    const userToken = localStorage.getItem('UserToken');
    if (!userToken) {
      console.error('User not logged in.');
      this.cart.set([]); // Set empty cart if user is not logged in
      return;
    }

    let parsedToken;
    try {
      parsedToken = JSON.parse(userToken);
    } catch (error) {
      console.error('Invalid token format:', error);
      return;
    }

    const userId = parsedToken?.userId;
    if (!userId || typeof userId !== 'number') {
      console.error('Invalid User ID:', userId);
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}/GetCart/${userId}`).subscribe({
      next: (cartItems) => {
        this.cart.set(cartItems); //  Store cart in signal
        console.log('Cart loaded:', cartItems);
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        this.cart.set([]); // Set empty cart on error
      },
    });
  }

  getCart() {
    return this.cart; //  Return global cart signal
  }

  addToCart(product: Product, quantity: number): Observable<any> {
    const userToken = localStorage.getItem('UserToken');

    // if (!userToken) {
    //   console.error('User not logged in.');
    //   return new Observable(); // Prevent API call if userToken is missing
    // }

    // let parsedToken;
    // try {
    //   parsedToken = JSON.parse(userToken);
    // } catch (error) {
    //   console.error('Invalid token format:', error);
    //   return new Observable();
    // }

    // const userId = parsedToken?.userId;

    // if (!userId || typeof userId !== 'number') {
    //   console.error('Invalid User ID:', userId);
    //   return new Observable();
    // }

    const payload = {
      userId: getUser(),
      productId: product.productId,
      quantity,
    };

    console.log('Payload being sent:', payload);

    return this.http.post(`${this.apiUrl}/AddToCart`, payload);
  }

  getCartById(): Observable<any[]> {
    const userToken = localStorage.getItem('UserToken');

    if (!userToken) {
      console.error('User not logged in.');
      return of([]); // Return an empty array
    }

    let parsedToken;
    try {
      parsedToken = JSON.parse(userToken);
    } catch (error) {
      console.error('Invalid token format:', error);
      return throwError(() => new Error('Invalid token format'));
    }

    const userId = parsedToken?.userId;

    if (!userId || typeof userId !== 'number') {
      console.error('Invalid User ID:', userId);
      return throwError(() => new Error('Invalid User ID'));
    }

    return this.http.get<any[]>(`${this.apiUrl}/GetCart/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching cart:', error);
        return throwError(() => new Error('Failed to fetch cart'));
      })
    );
  }
  removeFromCart(cartId: number): Observable<any> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/RemoveFromCart/${cartId}`)
      .pipe(
        tap((response) => console.log(response.message)),
        catchError((error) => {
          console.error('Error removing item:', error);
          return throwError(() => new Error('Failed to remove item'));
        })
      );
  }
}
