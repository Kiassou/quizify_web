import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  loading: boolean = false;
  messageError: string = '';

  private apiUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // 1. Validation de base
    if (!this.username.trim()) {
      this.messageError = "Veuillez entrer un nom d'utilisateur.";
      return;
    }

    // 2. Activation du spinner
    this.loading = true;
    this.messageError = '';

    console.log("Tentative de connexion vers :", this.apiUrl);

    this.http.post<any>(this.apiUrl, { username: this.username }).subscribe({
      next: (user: any) => {
        // SUCCÈS : On arrête le spinner et on stocke les infos
        this.loading = false;
        
        if (user && user.username) {
          localStorage.setItem('user_token', user.username); 
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Redirection selon le rôle
          if (user.role === 'ADMIN') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home-players']);
          }
        }
      },
      error: (err: any) => {
        // ERREUR : C'est ici qu'on force l'arrêt du spinner
        this.loading = false; 
        console.error("Détails de l'erreur :", err);

        if (err.status === 401) {
          this.messageError = "Identifiant inconnu. Réessaie encore ! 🧐";
        } else if (err.status === 0) {
          this.messageError = "Le serveur est injoignable. Vérifie ta connexion.";
        } else {
          // On affiche le message d'erreur envoyé par le backend s'il existe
          this.messageError = err.error?.error || "Une erreur inattendue est survenue.";
        }
      }
    });
  }
}