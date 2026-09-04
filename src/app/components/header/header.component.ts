import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public cart: CartService,
    public auth: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
