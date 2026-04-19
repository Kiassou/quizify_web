import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Pour le test, on utilise le localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token'); // Renvoie true si un token existe
  }

  login(token: string) {
    localStorage.setItem('user_token', token);
  }

  logout() {
    localStorage.removeItem('user_token');
  }
}