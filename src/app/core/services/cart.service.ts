import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/shop.model';
import { Product } from '../models/product.model';

const CART_KEY = 'ttb_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.restore());

  readonly itemCount = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((sum, i) => sum + i.quantity * i.product.price, 0));

  private restore(): CartItem[] {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  }

  private persist(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items()));
  }

  add(product: Product, quantity = 1): void {
    const current = [...this.items()];
    const existing = current.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
      current.push({ product, quantity: Math.min(quantity, product.stock) });
    }
    this.items.set(current);
    this.persist();
  }

  updateQuantity(productId: string, quantity: number): void {
    const current = this.items()
      .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    this.items.set(current);
    this.persist();
  }

  remove(productId: string): void {
    this.items.set(this.items().filter((i) => i.product.id !== productId));
    this.persist();
  }

  clear(): void {
    this.items.set([]);
    this.persist();
  }
}
