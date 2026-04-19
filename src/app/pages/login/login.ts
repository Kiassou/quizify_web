import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username: string = '';
  loading: boolean = false;
  messageError: string = '';

  // URL vers ton backend Spring Boot
  private apiUrl = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient, private router: Router) {}

 login() {
  if (!this.username.trim()) {
    this.messageError = "Veuillez entrer un nom d'utilisateur.";
    return;
  }

  this.loading = true;
  this.messageError = '';

  this.http.post<any>(this.apiUrl, { username: this.username }).subscribe({
    next: (user: any) => {
      // SÉCURITÉ : Si le backend renvoie 200 OK mais un objet vide
      if (!user || !user.username) {
        this.loading = false;
        this.messageError = "Utilisateur non trouvé ou données invalides.";
        return;
      }

      localStorage.setItem('user_token', user.username); 
      localStorage.setItem('currentUser', JSON.stringify(user));

      console.log("Connexion réussie :", user.prenom);
      this.loading = false;

      // Redirection selon le rôle
      if (user.role === 'ADMIN') {
        this.router.navigate(['/home-admin']);
      } else {
        this.router.navigate(['/home-players']);
      }
    },
    error: (err: any) => {
      // ICI : On force l'arrêt du spinner quoi qu'il arrive
      this.loading = false; 
      
      console.error("Erreur Backend complète :", err);

      // Si le backend renvoie du texte au lieu de JSON, l'erreur est ici
      if (err.status === 401 || err.status === 403) {
        this.messageError = "Identifiant inconnu. Réessaie encore ! 🧐";
      } else if (err.status === 0) {
        this.messageError = "Impossible de contacter le serveur (CORS ou Serveur HS).";
      } else {
        this.messageError = "Une erreur inattendue est survenue.";
      }
    }
  });
}
}