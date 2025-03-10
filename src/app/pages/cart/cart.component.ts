import {
  Component,
  inject,
  computed,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressModalComponent } from '../../components/address-modal/address-modal.component';
import { Address, AddressService } from '../../services/address.service';
import { getUser } from '../../utils/getUser';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    PrimaryButtonComponent,
    FormsModule,
    CommonModule,
    AddressModalComponent,
  ],
  template: `
    <app-header />

    <div class="p-6 flex flex-col gap-6 mb-20">
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
        <div class="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/5">
          <h2 class="text-2xl font-semibold mb-4">
            Delivery addresses ({{ addresses.length }})
          </h2>

          @if (addresses.length > 0) {
          <div class="flex flex-col gap-4">
            <div *ngFor="let address of addresses; trackBy: trackById">
              <div class="p-4 border rounded-lg shadow-sm">
                <label class="flex items-start gap-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="selectedAddress"
                    [value]="address.addressId"
                    [(ngModel)]="selectedAddressId"
                    class="mt-[7px]"
                  />
                  <div class="flex flex-col">
                    <span class="font-bold">{{ address.fullName }}</span>
                    <span
                      >{{ address.flatHouseNo }}, {{ address.areaStreet }},
                      {{ address.townCity }}, {{ address.pincode }}</span
                    >
                    <span class="text-sm text-gray-500"
                      >Phone: {{ address.mobileNumber }}</span
                    >
                    <div class="mt-2 text-blue-500 text-sm">
                      <a href="#" (click)="editAddress(address)"
                        >Edit address</a
                      >
                      |
                      <!-- <a href="#" (click)="addDeliveryInstructions(address)"
                        >Add delivery instructions</a
                      > -->
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <button class="text-blue-600 mt-4" (click)="openAddressModal()">
            Add a new delivery address
          </button>
          } @if (isLoadingAddresses) {
          <p>Loading addresses...</p>
          } @else if (addresses.length === 0 || showAddressForm) {
          <div class="mt-4">
            <h2 class="text-2xl font-semibold mb-4">
              Please enter your address
            </h2>
            <form class="flex flex-col gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.fullName"
              />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile number"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.mobileNumber"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.pincode"
              />
              <input
                type="text"
                name="flatHouseNo"
                placeholder="Flat, House no., Building"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.flatHouseNo"
              />
              <input
                type="text"
                name="areaStreet"
                placeholder="Area, Street, Sector"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.areaStreet"
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.landmark"
              />
              <input
                type="text"
                name="townCity"
                placeholder="Town/City"
                class="p-2 border rounded-md w-full"
                [(ngModel)]="addressForm.townCity"
              />

              <app-primary-button
                label="Continue"
                (btnClicked)="onContinue()"
              />
            </form>
          </div>
          }
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/5">
          <h2 class="text-2xl">Your Order</h2>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <span class="text-lg">Total</span>
              <span class="text-lg font-bold">{{ '₹ ' + totalPrice() }}</span>
            </div>

            <!-- Cart Items -->
            @for (item of cart(); track item.product.productId) {
            <div
              class="bg-white shadow-md border rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center md:justify-between"
            >
              <img
                [src]="'http://localhost:5053' + item.product.imgUrl"
                class="w-[50px] h-[50px] object-contain"
              />
              <div class="flex flex-col flex-grow text-center md:text-left">
                <span class="text-md font-bold">{{ item.product.name }}</span>
                <div class="mt-4">
                  <span class="text-sm">{{
                    '₹' + item.quantity * item.product.price
                  }}</span>
                  <span class="ml-2 bg-red-600 text-white p-2 rounded-md"
                    >Qty {{ item.quantity }}</span
                  >
                </div>
              </div>
              <app-button
                label="Remove"
                (btnClicked)="onRemove(item.cartId)"
                class="ml-auto md:ml-0 md:self-end"
              />
            </div>
            }
          </div>
        </div>
      </div>
      }
      <!-- Address Modal Component -->
      <app-address-modal
        (addressAdded)="onAddressAdded($event)"
      ></app-address-modal>
    </div>
  `,
  styles: ``,
})
export class CartComponent implements OnInit {
  @ViewChild(AddressModalComponent) addressModal!: AddressModalComponent;
  cartService = inject(CartService);
  addressService = inject(AddressService);
  cart = signal<any[]>([]);
  addresses: Address[] = [];
  selectedAddressId: number | null = null;
  isLoadingAddresses = true;
  showAddressForm = false;

  // New Address Form Data
  addressForm: Address = {
    fullName: '',
    mobileNumber: '',
    pincode: '',
    flatHouseNo: '',
    areaStreet: '',
    landmark: '',
    townCity: '',
    addressId: undefined,
    userId: 0,
    id: undefined,
  };

  ngOnInit(): void {
    this.fetchAddresses();
    this.fetchCart();
  }

  // Fetch Addresses from Backend
  fetchAddresses() {
    this.isLoadingAddresses = true;
    this.addressService.getAddressById().subscribe({
      next: (response) => {
        if (response && typeof response === 'object' && '$values' in response) {
          this.addresses = (response as { $values: any[] }).$values;
        } else {
          this.addresses = Array.isArray(response) ? response : [];
        }
        console.log(this.addresses);
        this.selectedAddressId =
          this.addresses.length > 0 ? this.addresses[0].addressId! : null;
        this.isLoadingAddresses = false;
      },
      error: (error) => {
        console.error('Error fetching addresses:', error);
        this.isLoadingAddresses = false;
      },
    });
  }

  fetchCart() {
    this.cartService.getCartById().subscribe({
      next: (cartItems) => {
        if (
          cartItems &&
          typeof cartItems === 'object' &&
          '$values' in cartItems
        ) {
          this.cart.set((cartItems as { $values: any[] }).$values);
        } else {
          this.cart.set(Array.isArray(cartItems) ? cartItems : []);
        }
      },
      error: (error) => console.error('Error fetching cart:', error),
    });
  }

  // Open Address Modal
  openAddressModal() {
    this.addressModal.openModal();
  }

  // Add New Address to Backend
  onAddressAdded(newAddress: Address) {
    this.addressService.addAddress(newAddress).subscribe({
      next: (savedAddress) => {
        this.addresses.push(savedAddress);
      },
      error: (error) => console.error('Error adding address:', error),
    });
  }

  onContinue() {
    if (
      !this.addressForm.fullName ||
      !this.addressForm.mobileNumber ||
      !this.addressForm.pincode
    ) {
      alert('Please fill in all required fields!');
      return;
    }
    this.addressForm.userId = getUser();
    this.addressService.addAddress(this.addressForm).subscribe({
      next: (savedAddress) => {
        this.addresses.push(savedAddress);
        this.selectedAddressId = savedAddress.addressId || 0;
        this.showAddressForm = false;
      },
      error: (error) => console.error('Error adding address:', error),
    });
  }

  // Edit Address
  editAddress(address: Address) {
    this.addressService
      .updateAddressById(address.addressId!, address)
      .subscribe({
        next: () => console.log('Address updated successfully'),
        error: (error) => console.error('Error updating address:', error),
      });
  }

  // Delete Address
  deleteAddress(addressId: number) {
    this.addressService.deleteAddressById(addressId).subscribe({
      next: () => {
        this.addresses = this.addresses.filter(
          (addr) => addr.addressId !== addressId
        );
      },
      error: (error) => console.error('Error deleting address:', error),
    });
  }

  onRemove(cartId: number) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.cart.set(this.cart().filter((item) => item.cartId !== cartId));
      },
      error: (error) => console.error('Error removing item:', error),
    });
  }

  // Track Addresses by ID
  trackById(index: number, item: Address) {
    return item.addressId;
  }

  cartIsEmpty = computed(() => this.cart().length === 0);

  totalPrice = computed(() =>
    this.cart().reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    )
  );
}
