import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  product: Product | null = null;
  selectedImage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cart: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.product = this.productService.getById(id) ?? null;
    if (this.product) {
      this.selectedImage = this.product.galleryImages?.[0] ?? this.product.imageUrl ?? '';
    }
  }

  get galleryImages(): string[] {
    return this.product?.galleryImages && this.product.galleryImages.length > 0
      ? this.product.galleryImages
      : this.product?.imageUrl
        ? [this.product.imageUrl]
        : [];
  }

  get averageRating(): number {
    const reviews = this.product?.reviews ?? [];
    if (!reviews.length) {
      return this.product?.rating ?? 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }

  get reviewCount(): number {
    return this.product?.reviews?.length ?? 0;
  }

  formatPrice(value: number): string {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cart.add(this.product, 1);
  }

  buyNow(): void {
    if (!this.product) {
      return;
    }

    this.cart.add(this.product, 1);

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: '/payment' } });
      return;
    }

    this.router.navigate(['/payment']);
  }
}
