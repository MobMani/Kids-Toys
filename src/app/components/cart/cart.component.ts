import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(
    public cart: CartService,
    private auth: AuthService,
    private orders: OrderService,
    private router: Router
  ) {}

  shipping(): number {
    return this.orders.calculateShipping(this.cart.subtotal());
  }

  total(): number {
    return this.cart.subtotal() + this.shipping();
  }

  decrease(productId: string, currentQty: number): void {
    this.cart.updateQuantity(productId, currentQty - 1);
  }

  increase(productId: string, currentQty: number, stock: number): void {
    if (currentQty < stock) {
      this.cart.updateQuantity(productId, currentQty + 1);
    }
  }

  goToCheckout(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/payment']);
    } else {
      this.router.navigate(['/login'], { queryParams: { redirectTo: '/payment' } });
    }
  }
}
