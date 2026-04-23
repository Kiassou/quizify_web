import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef // Injecté pour forcer la mise à jour visuelle
  ) {}

  login() {
    if (!this.username.trim()) {
      this.messageError = "Veuillez entrer un nom d'utilisateur.";
      return;
    }

    this.loading = true;
    this.messageError = '';

    console.log("Tentative de connexion vers :", this.apiUrl);

    this.http.post<any>(this.apiUrl, { username: this.username }).subscribe({
      next: (user: any) => {
        this.loading = false;
        
        if (user && user.username) {
          localStorage.setItem('user_token', user.username); 
          localStorage.setItem('currentUser', JSON.stringify(user));

          if (user.role === 'ADMIN') {
            this.router.navigate(['/home-admin']);
          } else {
            this.router.navigate(['/home-players']);
          }
        }
        this.cdr.detectChanges(); // Force le rafraîchissement
      },
      error: (err: any) => {
        // C'est ici que l'on débloque ton interface
        this.loading = false; 
        console.error("Erreur Backend reçue :", err);

        if (err.status === 401) {
          this.messageError = "Identifiant inconnu. Réessaie encore ! 🧐";
        } else if (err.status === 0) {
          this.messageError = "Le serveur est injoignable (Render s'endort parfois).";
        } else {
          this.messageError = "Une erreur est survenue. Réessaye plus tard.";
        }

        // ABSOLUMENT NÉCESSAIRE : On force Angular à voir que loading est passé à false
        this.cdr.detectChanges(); 
      }
    });
  }
}