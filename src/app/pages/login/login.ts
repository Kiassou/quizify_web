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
  isShake: boolean = false; // Pour l'effet "chic" de secousse

  private apiUrl = `${environment.apiUrl}/users/login`;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
    if (!this.username.trim()) {
      this.triggerError("Le pseudo ne peut pas être vide ! 🛑");
      return;
    }

    this.loading = true;
    this.messageError = '';
    this.isShake = false;

    this.http.post<any>(this.apiUrl, { username: this.username }).subscribe({
      next: (user: any) => {
        this.loading = false;
        if (user && user.username) {
          localStorage.setItem('user_token', user.username); 
          localStorage.setItem('user', JSON.stringify(user));
          user.role === 'ADMIN' ? this.router.navigate(['/home-admin']) : this.router.navigate(['/home-players']);
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        
        // Logique d'erreur personnalisée
        const errorMsg = err.status === 401 
          ? "Pseudo introuvable... Es-tu inscrit ? 🤔" 
          : "Connexion impossible au serveur. 🛠️";
        
        this.triggerError(errorMsg);
        this.cdr.detectChanges();
      }
    });
  }

  // Fonction pour gérer l'affichage temporaire et la réinitialisation
  private triggerError(msg: string) {
    this.messageError = msg;
    this.isShake = true; // Active l'animation CSS
    this.username = ''; // Réinitialisation immédiate du champ

    // On retire le message et l'effet après 3 secondes
    setTimeout(() => {
      this.messageError = '';
      this.isShake = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}