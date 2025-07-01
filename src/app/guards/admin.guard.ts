import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole();

  if (authService.isLoggedIn() && role === 'admin') {
    return true;
  } else {
    alert('Access Denied: Admins only');
    return router.parseUrl('/dashboard/student'); // or '/login'
  }
};
