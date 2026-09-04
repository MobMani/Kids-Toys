import { Injectable } from '@angular/core';
import { Address, CartItem, Order, OrderStatus, TrackingStep } from '../models/shop.model';

const ORDERS_KEY = 'ttb_orders';
const SHIPPING_FLAT = 4.99;
const FREE_SHIPPING_THRESHOLD = 50;

const STATUS_SEQUENCE: OrderStatus[] = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
const STATUS_NOTES: Record<OrderStatus, string> = {
  Placed: 'Your order landed safely in our workshop queue.',
  Packed: 'Every item was wrapped and boxed with care.',
  Shipped: 'Your box left the warehouse and is on its way.',
  'Out for Delivery': 'A driver has your box and is nearby.',
  Delivered: 'Delivered! Time to open the box.',
};

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readAll(): Order[] {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  }

  private writeAll(orders: Order[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  calculateShipping(subtotal: number): number {
    return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT;
  }

  placeOrder(items: CartItem[], address: Address, paymentMethod: string): Order {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    const shipping = this.calculateShipping(subtotal);
    const placedAt = new Date().toISOString();
    const order: Order = {
      id: 'TTB-' + Math.floor(100000 + Math.random() * 899999),
      items,
      address,
      paymentMethod,
      subtotal,
      shipping,
      total: subtotal + shipping,
      placedAt,
      status: 'Placed',
      tracking: [{ status: 'Placed', timestamp: placedAt, note: STATUS_NOTES.Placed }],
    };
    const orders = this.readAll();
    orders.unshift(order);
    this.writeAll(orders);
    return order;
  }

  getById(id: string): Order | undefined {
    const order = this.readAll().find((o) => o.id === id);
    return order ? this.withSimulatedProgress(order) : undefined;
  }

  getAll(): Order[] {
    return this.readAll().map((o) => this.withSimulatedProgress(o));
  }

  /** Simulates a live tracking timeline: one step unlocks roughly every 40 seconds after placing, purely for demo purposes. */
  private withSimulatedProgress(order: Order): Order {
    const minutesElapsed = (Date.now() - new Date(order.placedAt).getTime()) / 1000 / 40;
    const stepsUnlocked = Math.min(STATUS_SEQUENCE.length, 1 + Math.floor(minutesElapsed));
    const tracking: TrackingStep[] = STATUS_SEQUENCE.slice(0, stepsUnlocked).map((status, idx) => ({
      status,
      timestamp: new Date(new Date(order.placedAt).getTime() + idx * 40 * 1000).toISOString(),
      note: STATUS_NOTES[status],
    }));
    return { ...order, status: tracking[tracking.length - 1].status, tracking };
  }
}
