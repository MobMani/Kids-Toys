import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order, OrderStatus } from '../../core/models/shop.model';
import { OrderService } from '../../core/services/order.service';

const ALL_STATUSES: OrderStatus[] = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css',
})
export class OrderTrackingComponent implements OnInit, OnDestroy {
  readonly order = signal<Order | undefined>(undefined);
  readonly statuses = ALL_STATUSES;
  private orderId: string | null = null;
  private timer?: ReturnType<typeof setInterval>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  private refresh(): void {
    if (this.orderId) this.order.set(this.orderService.getById(this.orderId));
  }

  stepState(status: OrderStatus): 'done' | 'current' | 'upcoming' {
    const o = this.order();
    if (!o) return 'upcoming';
    const currentIndex = this.statuses.indexOf(o.status);
    const stepIndex = this.statuses.indexOf(status);
    if (stepIndex < currentIndex) return 'done';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  }

  noteFor(status: OrderStatus): string | undefined {
    return this.order()?.tracking.find((t) => t.status === status)?.note;
  }

  timeFor(status: OrderStatus): string | undefined {
    const ts = this.order()?.tracking.find((t) => t.status === status)?.timestamp;
    return ts ? new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : undefined;
  }
}
