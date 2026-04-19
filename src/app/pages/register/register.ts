import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule 
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  username: string = '';
  email: string = '';
  loading: boolean = false;
  messageSuccess: string = '';
  messageError: string = '';

  private apiUrl = 'http://localhost:8080/users/register';

  constructor(private http: HttpClient, private router: Router) {} // HttpClient est maintenant reconnu

  register() {
    this.loading = true;
    this.messageError = '';
    this.messageSuccess = '';

    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      username: this.username,
      email: this.email
    };

    // Ajout du typage <any> pour éviter l'erreur TS7006 sur response et err
    this.http.post<any>(this.apiUrl, userData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.messageSuccess = "Compte créé ! Bienvenue dans Quizify 🚀";
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 400) {
          this.messageError = "Oups ! Ce pseudo ou cet email est déjà utilisé. 🧐";
        } else if (!err.status || err.status === 0) {
          this.messageError = "Impossible de contacter le serveur. Est-il lancé ? 🛠️";
        } else {
          this.messageError = "Erreur technique. Réessaye plus tard ! 🛠️";
        }
      }
    });
  }
}