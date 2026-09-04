import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  private fb = inject(FormBuilder);
  readonly addressForm = this.fb.group({
    fullName: ['', Validators.required],
    line1: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\- ]{3,10}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]{7,15}$/)]],
  });

  readonly paymentForm = this.fb.group({
    method: ['card', Validators.required],
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  readonly placing = signal(false);

  constructor(
    // private fb: FormBuilder,
    public cart: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  get isCard(): boolean {
    return this.paymentForm.controls.method.value === 'card';
  }

  shipping(): number {
    return this.orderService.calculateShipping(this.cart.subtotal());
  }

  total(): number {
    return this.cart.subtotal() + this.shipping();
  }

  placeOrder(): void {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.invalid) return;

    if (this.isCard) {
      this.paymentForm.markAllAsTouched();
      if (
        this.paymentForm.controls.cardName.invalid ||
        this.paymentForm.controls.cardNumber.invalid ||
        this.paymentForm.controls.expiry.invalid ||
        this.paymentForm.controls.cvv.invalid
      ) {
        return;
      }
    }

    this.placing.set(true);
    const address = this.addressForm.getRawValue() as any;
    const methodLabel = this.isCard ? 'Credit / debit card' : 'Cash on delivery';

    const order = this.orderService.placeOrder(this.cart.items(), address, methodLabel);
    this.cart.clear();
    this.placing.set(false);
    this.router.navigate(['/order-placed', order.id]);
  }
}
