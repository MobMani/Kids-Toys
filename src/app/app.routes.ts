import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    title: 'Tumble Toy Box — Toys worth jumping for',
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
    title: 'Log in — Tumble Toy Box',
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent),
    title: 'Create account — Tumble Toy Box',
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart.component').then((m) => m.CartComponent),
    title: 'Your cart — Tumble Toy Box',
  },
  {
    path: 'upload-products',
    loadComponent: () =>
      import('./components/upload-product-list/upload-product-list.component').then((m) => m.UploadProductListComponent),
    title: 'Upload product list — Tumble Toy Box',
    canActivate: [adminGuard],
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-info/product-info.component').then((m) => m.ProductInfoComponent),
    title: 'Product details — Tumble Toy Box',
  },
  {
    path: 'payment',
    loadComponent: () => import('./components/payment/payment.component').then((m) => m.PaymentComponent),
    title: 'Checkout — Tumble Toy Box',
    canActivate: [authGuard],
  },
  {
    path: 'order-placed/:id',
    loadComponent: () =>
      import('./components/order-placed/order-placed.component').then((m) => m.OrderPlacedComponent),
    title: 'Order placed — Tumble Toy Box',
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/order-details/order-details.component').then((m) => m.OrderDetailsComponent),
    title: 'Order details — Tumble Toy Box',
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id/tracking',
    loadComponent: () =>
      import('./components/order-tracking/order-tracking.component').then((m) => m.OrderTrackingComponent),
    title: 'Track order — Tumble Toy Box',
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page not found — Tumble Toy Box',
  },
];
