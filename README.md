# Tumble Toy Box

An Angular 17 (standalone components) storefront for an online kids' toy shop —
built with a playful, toy-box-inspired visual identity (Baloo 2 + Nunito,
bubblegum pink / sunshine yellow / mint / sky blue on a warm cream base).

## Getting started

```bash
npm install
npm start
```

Then open **http://localhost:4200**.

This is a front-end-only demo: there's no real backend. Accounts, cart
contents, and orders are all persisted to the browser's `localStorage`, and
payment is simulated (no real payment is processed). Order tracking auto-
advances through statuses over time so you can watch the timeline move.

## Structure

```
src/app/
  core/
    models/       Product, User, Order, Address, CartItem, TrackingStep
    services/     ProductService, AuthService, CartService, OrderService
    guards/       authGuard — protects checkout & order routes
  components/
    header/            top nav, cart badge, login/logout state
    footer/
    home/              hero + category filter + product grid (the main "app" content)
    product-card/       reusable toy card used on the home grid
    login/
    register/
    cart/              add/remove/update quantity, order summary
    payment/           shipping address + payment method + place order
    order-placed/      confirmation screen after checkout
    order-details/     itemized view of a past order
    order-tracking/    live status timeline for an order
    not-found/         404 page
  app.routes.ts     route table (lazy-loaded standalone components)
  app.config.ts     providers (router)
  app.component.*   shell: header + <router-outlet> + footer
```

## Routes

| Path                        | Component            | Notes                  |
|------------------------------|-----------------------|-------------------------|
| `/`                          | Home                  | product listing         |
| `/login`                     | Login                 |                         |
| `/register`                  | Register              |                         |
| `/cart`                      | Cart                  |                         |
| `/payment`                   | Payment               | requires login          |
| `/order-placed/:id`          | OrderPlaced           | requires login          |
| `/orders/:id`                | OrderDetails          | requires login          |
| `/orders/:id/tracking`       | OrderTracking         | requires login          |
| `**`                         | NotFound              |                         |

## Notes on extending this into a real store

- Swap `ProductService`, `AuthService`, `CartService`, and `OrderService`'s
  localStorage logic for real HTTP calls to your backend/API — the component
  code that consumes them won't need to change much since they're already
  behind an injectable service boundary.
- Add real payment processing (e.g. Stripe Elements) inside `PaymentComponent`
  in place of the demo card form.
- Add product detail pages, search, and reviews if you want a fuller catalog
  experience.
