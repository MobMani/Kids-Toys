import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isAdmin()) {
    return true;
  }

  if (auth.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } });
};
