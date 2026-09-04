import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductCategory } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-upload-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './upload-product-list.component.html',
  styleUrl: './upload-product-list.component.css',
})
export class UploadProductListComponent {
  readonly categories: ProductCategory[] = ['Building', 'Plush', 'Outdoor', 'Puzzles', 'Pretend Play', 'Vehicles'];
  readonly previewImage = signal<string | null>(null);
  readonly submitting = signal(false);
  readonly success = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['Building' as ProductCategory, Validators.required],
    price: [24.99, [Validators.required, Validators.min(0.01)]],
    ageRange: ['3–6 yrs', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    stock: [10, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.error.set('Please choose a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage.set(String(reader.result));
      this.error.set(null);
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Please fill in all product details before saving.');
      return;
    }

    this.submitting.set(true);
    this.success.set(null);
    this.error.set(null);

    const values = this.form.getRawValue();
    const product: Product = {
      id: `p-${Date.now()}`,
      name: values.name!.trim(),
      category: values.category as ProductCategory,
      price: Number(values.price),
      ageRange: values.ageRange!.trim(),
      description: values.description!.trim(),
      stock: Number(values.stock),
      rating: 4.7,
      badge: 'New',
      colorway: this.defaultPalette(values.category as ProductCategory).colorway,
      accent: this.defaultPalette(values.category as ProductCategory).accent,
      imageUrl: this.previewImage() ?? undefined,
    };

    this.productService.saveProduct(product);
    this.submitting.set(false);
    this.success.set(`${product.name} was added to the catalog.`);
    this.form.reset({
      name: '',
      category: 'Building',
      price: 24.99,
      ageRange: '3–6 yrs',
      description: '',
      stock: 10,
    });
    this.previewImage.set(null);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private defaultPalette(category: ProductCategory): { colorway: string; accent: string } {
    const palette: Record<ProductCategory, { colorway: string; accent: string }> = {
      Building: { colorway: '#FFC53D', accent: '#8A6300' },
      Plush: { colorway: '#FF6FA0', accent: '#E84E82' },
      Outdoor: { colorway: '#4FAFE0', accent: '#1D6E96' },
      Puzzles: { colorway: '#2FBF9F', accent: '#16826A' },
      'Pretend Play': { colorway: '#FF7A5A', accent: '#C24B2F' },
      Vehicles: { colorway: '#FFC53D', accent: '#8A6300' },
    };

    return palette[category];
  }
}
