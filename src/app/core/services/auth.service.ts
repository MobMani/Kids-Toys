import { Injectable, signal } from '@angular/core';
import { User } from '../models/shop.model';

const USERS_KEY = 'ttb_users';
const SESSION_KEY = 'ttb_session';
const ADMIN_EMAIL = 'admin@tumbletoybox.com';
const NORMAL_USER_EMAIL = 'user@example.com';
const NORMAL_USER_PASSWORD = 'user123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<User | null>(this.restoreSession());

  constructor() {
    this.ensureAdminSeed();
    this.ensureNormalUserSeed();
  }

  private restoreSession(): User | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  private readUsers(): User[] {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  }

  private writeUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private ensureAdminSeed(): void {
    const users = this.readUsers();
    const hasAdmin = users.some((user) => user.email.toLowerCase() === ADMIN_EMAIL);

    if (!hasAdmin) {
      users.push({
        id: 'u-admin',
        fullName: 'Admin User',
        email: ADMIN_EMAIL,
        password: 'admin123',
        role: 'admin',
      });
      this.writeUsers(users);
    }
  }

  private ensureNormalUserSeed(): void {
    const users = this.readUsers();
    const hasNormalUser = users.some((user) => user.email.toLowerCase() === NORMAL_USER_EMAIL);

    if (!hasNormalUser) {
      users.push({
        id: 'u-user',
        fullName: 'Normal User',
        email: NORMAL_USER_EMAIL,
        password: NORMAL_USER_PASSWORD,
        role: 'customer',
      });
      this.writeUsers(users);
    }
  }

  register(fullName: string, email: string, password: string): { ok: boolean; message?: string } {
    const users = this.readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with that email already exists.' };
    }
    const user: User = { id: 'u-' + Date.now(), fullName, email, password, role: 'customer' };
    users.push(user);
    this.writeUsers(users);
    this.startSession(user);
    return { ok: true };
  }

  login(email: string, password: string): { ok: boolean; message?: string } {
    const users = this.readUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      return { ok: false, message: 'Email or password is incorrect.' };
    }

    if (!found.role) {
      found.role = 'customer';
      this.writeUsers(users);
    }

    this.startSession(found);
    return { ok: true };
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin' || user?.email?.toLowerCase() === ADMIN_EMAIL;
  }

  private startSession(user: User): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
}
