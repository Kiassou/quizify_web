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

  private apiUrl = 'http://localhost:8080/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.username) return;

    this.loading = true;
    this.messageError = '';

    // On envoie le username au backend pour vérification
    this.http.post<any>(this.apiUrl, { username: this.username }).subscribe({
      next: (user: any) => {
        this.loading = false;
        
        // Stocker les infos de l'utilisateur (optionnel, pour plus tard)
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Petit message sympa dans la console pour débugger
        console.log("Bienvenue " + user.prenom + " ! Rôle : " + user.role);

        // REDIRECTION AUTOMATIQUE SELON LE RÔLE
        if (user.role === 'ADMIN') {
          this.router.navigate(['/home-admin']);
        } else {
          this.router.navigate(['/home-players']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.messageError = "Identifiant inconnu ou serveur hors ligne. 🧐";
      }
    });
  }
  
}