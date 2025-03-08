import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Overlay -->
    <div
      *ngIf="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">
          {{ isEditMode ? 'Edit Product' : 'Add Product' }}
        </h2>

        <!-- Product Name -->
        <label class="block mb-2">Product Name:</label>
        <input
          [(ngModel)]="product.name"
          type="text"
          class="w-full p-2 border rounded-md mb-3"
        />

        <!-- Regular Price -->
        <label class="block mb-2">Regular Price:</label>
        <input
          [(ngModel)]="product.price"
          type="text"
          class="w-full p-2 border rounded-md mb-3"
        />

        <!-- Sale Price -->
        <label class="block mb-2">Sale Price:</label>
        <input
          [(ngModel)]="product.salePrice"
          type="text"
          class="w-full p-2 border rounded-md mb-3"
        />

        <!-- Stock Quantity -->
        <label class="block mb-2">Stock:</label>
        <input
          [(ngModel)]="product.stock"
          type="number"
          class="w-full p-2 border rounded-md mb-3"
        />

        <!-- Product Photo URL -->
        <label class="block mb-2">Photo URL:</label>
        <input
          [(ngModel)]="product.imgUrl"
          (input)="clearFileSelection()"
          type="text"
          class="w-full p-2 border rounded-md mb-3"
          [disabled]="photoFile !== null"
        />

        <!-- OR Upload Photo -->
        <label class="block mb-2">Upload Photo:</label>
        <input
          type="file"
          (change)="onFileSelected($event)"
          class="w-full p-2 border rounded-md mb-3"
          [disabled]="product.imgUrl"
        />

        <!-- Publish Toggle -->
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            [(ngModel)]="product.published"
            class="form-checkbox"
          />
          <span>Publish to Store</span>
        </label>

        <!-- Buttons -->
        <div class="flex justify-end mt-4 space-x-3">
          <button
            (click)="closeModal.emit()"
            class="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            (click)="handleSave()"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {{ isEditMode ? 'Save Changes' : 'Add Product' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductModalComponent {
  @Input() showModal: boolean = false;
  @Input() product: any = {
    name: '',
    price: '',
    salePrice: '',
    imgUrl: '',
    published: false,
    stock: 0,
  };
  @Input() isEditMode: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<any>();

  photoFile: File | null = null;

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.photoFile = fileInput.files[0];
      this.product.imgUrl = ''; // Clear the URL field if a file is selected
    }
  }

  clearFileSelection() {
    if (this.product.imgUrl) {
      this.photoFile = null; // Remove file selection if URL is manually entered
    }
  }

  handleSave() {
    const formData = new FormData();

    formData.append('name', this.product.name);
    formData.append('price', this.product.price);
    formData.append('salePrice', this.product.salePrice);
    formData.append('stock', this.product.stock);
    formData.append('published', String(this.product.published));

    if (this.photoFile) {
      formData.append('imageFile', this.photoFile);
    } else if (this.product.imgUrl?.trim()) {
      formData.append('imgUrl', this.product.imgUrl);
    }

    this.saveProduct.emit(formData);
  }
}
