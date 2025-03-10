// import { Component, computed, inject, input, OnInit } from '@angular/core';
// import { Product } from '../../products-list/products-list.component';
// import { ButtonComponent } from '../../../components/button/button.component';
// import { CartService } from '../../../services/cart.service';

// @Component({
//   selector: 'app-cart-item',
//   imports: [ButtonComponent],
//   template: `
//     <div
//       class="bg-white shadow-md border rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center md:justify-between"
//     >
//       <img
//         [src]="'http://localhost:5053' + item().product.imgUrl"
//         class="w-[50px] h-[50px] object-contain"
//       />

//       <div class="flex flex-col flex-grow text-center md:text-left">
//         <span class="text-md font-bold">{{ item().product.name }}</span>
//         <div class="mt-4">
//           <span class="text-sm"> {{ '₹' + price() }}</span>
//           <span class="ml-2 bg-red-600 text-white p-2 rounded-md">
//             {{ 'Qty' + ' ' + item().quantity }}
//           </span>
//         </div>
//       </div>

//       <app-button
//         label="Remove"
//         (btnClicked)="onRemove()"
//         class="ml-auto md:ml-0 md:self-end"
//       />
//     </div>
//   `,
//   styles: ``,
// })
// export class CartItemComponent implements OnInit {
//   cartService = inject(CartService);

//   item = input.required<{
//     product: Product;
//     quantity: number;
//     imgUrl: string;
//     cartId: number;
//   }>();

//   price = computed(() => {
//     const item = this.item();
//     return item?.quantity && item?.product.price
//       ? item.quantity * item.product.price
//       : 0;
//   });
//   ngOnInit(): void {
//     console.log(this.item);
//   }

//   onRemove() {
//     this.cartService.removeFromCart(this.item().cartId).subscribe({
//       next: () => {
//         console.log('Item removed successfully');
//       },
//       error: (error) => {
//         console.error('Error removing item:', error);
//       },
//     });
//   }
// }
