import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs'; // <--- AJOUTE CET IMPORT

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
    if (!this.username.trim()) {
      this.messageError = "Veuillez entrer un nom d'utilisateur.";
      return;
    }

    this.loading = true;
    this.messageError = '';

    this.http.post<any>(this.apiUrl, { username: this.username })
      .pipe(
        // C'est ici que la magie opère : force l'arrêt du spinner
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (user: any) => {
          if (!user || !user.username) {
            this.messageError = "Utilisateur non trouvé ou données invalides.";
            return;
          }

          localStorage.setItem('user_token', user.username); 
          localStorage.setItem('currentUser', JSON.stringify(user));

          console.log("Connexion réussie :", user.prenom);

          if (user.role === 'ADMIN') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home-players']);
          }
        },
        error: (err: any) => {
          console.error("Erreur Backend complète :", err);
          if (err.status === 401 || err.status === 403) {
            this.messageError = "Identifiant inconnu. Réessaie encore ! 🧐";
          } else if (err.status === 0) {
            this.messageError = "Impossible de contacter le serveur.";
          } else {
            this.messageError = "Une erreur inattendue est survenue.";
          }
        }
      });
  }
}