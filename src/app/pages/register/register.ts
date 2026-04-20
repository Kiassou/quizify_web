import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule 
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  // Modèles de données pour le formulaire
  nom: string = '';
  prenom: string = '';
  username: string = '';
  email: string = '';
  
  // États de l'interface
  loading: boolean = false;
  messageSuccess: string = '';
  messageError: string = '';

  // URL du Backend (Assure-toi que le port 8080 est bien celui de ton Spring Boot)
  private apiUrl = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    // 1. Validation de sécurité côté Client
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
      role: 'PLAYER' // On définit par défaut le rôle pour les nouveaux inscrits
    };

    // 2. Envoi de la requête au Backend
    this.http.post<any>(this.apiUrl, userData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.messageSuccess = "Compte créé avec succès ! Redirection... 🚀";
        
        // Optionnel : On peut vider les champs après succès
        this.resetForm();

        // 3. Redirection vers le login après un court délai pour laisser l'utilisateur lire
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err: any) => {
        this.loading = false;
        console.error("Détails de l'erreur d'inscription :", err);

        // 4. Gestion précise des codes d'erreur HTTP
        if (err.status === 400 || err.status === 409) {
          this.messageError = "Ce pseudo ou cet email est déjà utilisé. 🧐";
        } else if (err.status === 0) {
          this.messageError = "Le serveur est injoignable. Vérifie ta connexion ou le backend. 🛠️";
        } else {
          this.messageError = "Une erreur technique est survenue. Réessaye plus tard.";
        }
      }
    });
  }

  // Fonction utilitaire pour vider le formulaire
  private resetForm() {
    this.nom = '';
    this.prenom = '';
    this.username = '';
    this.email = '';
  }
}