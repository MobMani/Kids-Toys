import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models/shop.model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  readonly order = signal<Order | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.order.set(this.orderService.getById(id));
  }

  placedDate(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}
