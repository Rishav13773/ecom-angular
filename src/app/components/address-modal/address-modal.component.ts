import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getUser } from '../../utils/getUser';

@Component({
  selector: 'app-address-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h2 class="text-xl font-bold mb-4">Add New Address</h2>
        <form (ngSubmit)="addAddress()">
          <input
            [(ngModel)]="newAddress.fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            required
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.mobileNumber"
            name="mobileNumber"
            type="text"
            placeholder="Mobile Number"
            required
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.pincode"
            type="text"
            name="pincode"
            placeholder="Pincode"
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.flatHouseNo"
            name="flatHouseNo"
            type="text"
            placeholder="Flat, House no., Building"
            required
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.areaStreet"
            name="areaStreet"
            type="text"
            placeholder="Area, Street, Sector"
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.landmark"
            type="text"
            name="landmark"
            placeholder="Landmark"
            class="p-2 border rounded-md w-full mb-2"
          />
          <input
            [(ngModel)]="newAddress.townCity"
            name="townCity"
            type="text"
            placeholder="Town/City"
            required
            class="p-2 border rounded-md w-full"
          />

          <div class="flex justify-between mt-4">
            <button type="button" class="text-red-500" (click)="closeModal()">
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
      }
    `,
  ],
})
export class AddressModalComponent {
  @Output() addressAdded = new EventEmitter<any>();

  isOpen = false;
  newAddress = {
    fullName: '',
    mobileNumber: '',
    landmark: '',
    pincode: '',
    flatHouseNo: '',
    areaStreet: '',
    townCity: '',
    userId: getUser(),
    id: undefined,
  };

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  addAddress() {
    if (this.newAddress.fullName && this.newAddress.mobileNumber) {
      this.addressAdded.emit({ ...this.newAddress, id: Date.now() });
      this.closeModal();
      this.newAddress = {
        fullName: '',
        mobileNumber: '',
        landmark: '',
        pincode: '',
        flatHouseNo: '',
        areaStreet: '',
        townCity: '',
        userId: getUser(),
        id: undefined,
      };
    }
  }
}
