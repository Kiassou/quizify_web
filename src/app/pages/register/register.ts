import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs'; // Ajout pour sécuriser le spinner

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
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

  // ✅ CORRECTION : L'URL doit pointer vers /register et non /login
  private apiUrl = `${environment.apiUrl}/users/register`;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.nom.trim() || !this.prenom.trim() || !this.username.trim() || !this.email.trim()) {
      this.messageError = "Tous les champs sont obligatoires ! 📋";
      return;
    }

    this.loading = true;
    this.messageError = '';
    this.messageSuccess = '';

    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      username: this.username,
      email: this.email,
      role: 'PLAYER' 
    };

    this.http.post<any>(this.apiUrl, userData)
      .pipe(
        // Sécurité : Quoi qu'il arrive, on arrête le spinner à la fin
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: any) => {
          this.messageSuccess = "Compte créé avec succès ! Redirection... 🚀";
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2500);
        },
        error: (err: any) => {
          console.error("Erreur d'inscription :", err);
          if (err.status === 400 || err.status === 409) {
            this.messageError = "Ce pseudo ou cet email est déjà utilisé. 🧐";
          } else {
            this.messageError = "Le serveur ne répond pas correctement. Réessaye !";
          }
        }
      });
  }

  private resetForm() {
    this.nom = '';
    this.prenom = '';
    this.username = '';
    this.email = '';
  }
}