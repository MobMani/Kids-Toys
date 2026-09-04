import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role?: 'customer' | 'admin';
}

export interface Address {
  fullName: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface TrackingStep {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  placedAt: string;
  status: OrderStatus;
  tracking: TrackingStep[];
}
