import { Component, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PortalService } from '../../services/portal.service';

export type Product = {
  id: number;
  productId: number;
  name?: string;
  price?: number;
  salePrice?: number;
  imgUrl: string;
  stock?: number;
  published?: boolean;
};

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent, HeaderComponent],
  template: `
    <div class="mb-20">
      <app-header />
      <div class="p-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:mx-10 lg:mx-48">
        @for (product of products; track product.$id) {
        <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsListComponent implements OnInit {
  constructor(private portalService: PortalService) {}
  ngOnInit() {
    this.fetchProducts();
  }

  products: any[] = [];

  fetchProducts() {
    this.portalService.getProducts().subscribe((data: any) => {
      console.log('API Response:', data);

      if (data && typeof data === 'object' && '$values' in data) {
        this.products = (data as { $values: any[] }).$values;
      } else {
        this.products = Array.isArray(data) ? data : [];
      }

      // Ensure unique IDs
      this.products = this.products.map((product, index) => ({
        ...product,
        id: product.id ?? index, // Assign index if id is missing
      }));

      console.log('Processed Products:', this.products);
    });
  }
}
