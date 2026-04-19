import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

// La logique simple : on vérifie si un token existe
const isAuthenticated = () => !!localStorage.getItem('user_token');

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (isAuthenticated()) return true;
  
  return router.parseUrl('/login'); // Redirige vers login
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (!isAuthenticated()) return true;

  return router.parseUrl('/home-players'); // Redirige vers l'accueil si déjà connecté
};