import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() canDelete = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() buyNow = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();
}
