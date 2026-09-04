import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Product, ProductCategory } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly categories: ProductCategory[];
  readonly activeCategory = signal<ProductCategory | 'All'>('All');
  readonly searchTerm = signal('');
  readonly toastProduct = signal<Product | null>(null);
  readonly promoBanners = [
    {
      title: 'New arrival',
      subtitle: 'Glowpath Night Blocks',
      offer: 'Save 20% this week',
      imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Backyard fun',
      subtitle: 'Comet Kite bundle',
      offer: 'Free shipping over $35',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Best seller',
      subtitle: 'Cloud Fort Tent',
      offer: 'Limited stock, extra cozy',
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    },
  ];

  private allProducts: Product[];

  readonly visibleProducts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cat = this.activeCategory();
    let products = cat === 'All' ? this.allProducts : this.allProducts.filter((p) => p.category === cat);

    if (term) {
      products = products.filter((p) => {
        return (
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
      });
    }

    return products;
  });

  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private productService: ProductService,
    public cart: CartService,
    public auth: AuthService,
    private router: Router
  ) {
    this.allProducts = this.productService.getAll();
    this.categories = this.productService.getCategories();
  }

  setCategory(category: ProductCategory | 'All'): void {
    this.activeCategory.set(category);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  deleteProduct(productId: string): void {
    if (!this.auth.isAdmin()) {
      return;
    }

    this.productService.deleteProduct(productId);
    this.allProducts = this.productService.getAll();
  }

  handleAddToCart(product: Product): void {
    this.cart.add(product, 1);
    this.toastProduct.set(product);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastProduct.set(null), 2400);
  }

  handleBuyNow(product: Product): void {
    this.cart.add(product, 1);

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: '/payment' } });
      return;
    }

    this.router.navigate(['/payment']);
  }
}
