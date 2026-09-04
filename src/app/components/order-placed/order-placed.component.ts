import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models/shop.model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-placed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-placed.component.html',
  styleUrl: './order-placed.component.css',
})
export class OrderPlacedComponent implements OnInit {
  readonly order = signal<Order | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.order.set(this.orderService.getById(id));
  }
}
