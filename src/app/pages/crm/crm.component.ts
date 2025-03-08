import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-crm',
  standalone: true, // Ensure this is standalone
  imports: [CommonModule, ProductModalComponent], // Import the modal correctly
  template: `
    <div
      class="max-w-6xl mx-20 mt-20 p-6 mb-32 bg-white shadow-md rounded-lg md:mx-auto"
    >
      <h2 class="text-2xl font-semibold mb-4">Product Management</h2>

      <!-- Add Product Button -->
      <button
        (click)="openAddModal()"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Product
      </button>

      <!-- Product Table -->
      <div class="max-h-[800px] overflow-y-auto overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-3 text-left">Photo</th>
              <th class="border p-3 text-left">Product Name</th>
              <th class="border p-3 text-left">Regular Price</th>
              <th class="border p-3 text-left">Sale Price</th>
              <th class="border p-3 text-left">Stock</th>
              <!-- Added -->
              <th class="border p-3 text-left">Status</th>
              <th class="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products[1]" class="hover:bg-gray-50">
              <td class="border p-3">
                <img
                  [src]="'http://localhost:5053' + product.imgUrl"
                  alt="Product"
                  class="w-12 h-12 rounded-md object-cover"
                />
              </td>
              <td class="border p-3">{{ product.name }}</td>
              <td class="border p-3">{{ '₹' + product.price }}</td>
              <td class="border p-3 text-red-500">
                {{ '₹' + product.salePrice }}
              </td>
              <td class="border p-3">{{ product.stock }}</td>
              <!-- Added -->
              <td class="border p-3">
                <span
                  class="py-1 rounded text-sm font-medium"
                  [ngClass]="
                    product.published
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  "
                >
                  {{
                    product.published
                      ? 'Online Store Publish'
                      : 'Online Store Unpublish'
                  }}
                </span>
              </td>
              <td
                class="border p-3 flex flex-col gap-2 items-center justify-center"
              >
                <button
                  (click)="openEditModal(product)"
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  (click)="deleteProduct(product.productId)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Modal -->
    <app-product-modal
      [showModal]="showModal"
      [product]="selectedProduct"
      [isEditMode]="isEditMode"
      (closeModal)="showModal = false"
      (saveProduct)="saveProduct($event)"
    ></app-product-modal>
  `,
})
export class CrmComponent implements OnInit {
  showModal = false;
  isEditMode = false;
  selectedProduct: any = {
    name: '',
    price: '',
    salePrice: '',
    imgUrl: '',
    published: false,
    stock: 0,
  };

  products: any[] = [];

  constructor(private portalService: PortalService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.portalService.getProducts().subscribe((data) => {
      console.log('API Response:', data); // Debugging the response
      console.log('Type of Data:', typeof data);
      console.log('Instance Check:', Array.isArray(data));

      if (Array.isArray(data)) {
        this.products = data;
      } else if (data && typeof data === 'object') {
        this.products = Object.values(data);
      } else {
        this.products = [];
      }

      console.log('Processed Products:', this.products[1]);
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedProduct = {
      name: '',
      price: '',
      salePrice: '',
      imgUrl: '',
      published: false,
      stock: 0,
    };
    this.showModal = true;
  }

  openEditModal(product: any) {
    this.isEditMode = true;
    this.selectedProduct = { ...product };
    this.showModal = true;
  }

  saveProduct(formData: FormData) {
    if (this.isEditMode) {
      this.portalService
        .updateProduct(this.selectedProduct.productId, formData)
        .subscribe(() => {
          this.fetchProducts();
          this.showModal = false;
        });
    } else {
      this.portalService.addProduct(formData).subscribe(() => {
        this.fetchProducts();
        this.showModal = false;
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.portalService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }
}
