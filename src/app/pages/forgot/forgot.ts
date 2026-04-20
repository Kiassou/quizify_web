import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './forgot.html',
  styleUrls: ['./forgot.css']
})
export class ForgotComponent {
  email: string = '';
  code: string = '';
  loading: boolean = false;
  showModal: boolean = false;
  isError: boolean = false; // Pour l'effet de secousse (shake) sur l'input du code

  private apiUrl = `${environment.apiUrl}/users/login`;
  errorInCode: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Étape 1 : Envoi de l'email pour recevoir le code de récupération
   */
  sendEmail() {
    if (!this.email.trim()) return;
    
    this.loading = true;

    // Utilisation de responseType: 'text' car certains backends renvoient un simple message de succès
    this.http.post(`${this.apiUrl}/send-code`, null, { 
      params: { email: this.email },
      responseType: 'text' 
    }).subscribe({
      next: () => {
        this.loading = false;
        this.showModal = true;
        this.cdr.detectChanges(); // Force Angular à mettre à jour la vue pour afficher la modal
      },
      error: (err) => {
        this.loading = false;
        console.error("Erreur sendEmail:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: 'Email introuvable ou erreur serveur. Vérifie ton adresse !',
          confirmButtonColor: '#e73c7e'
        });
      }
    });
  }

  /**
   * Étape 2 : Vérification du code saisi par l'utilisateur
   */
  verifyCode() {
    if (!this.code.trim()) return;
    
    this.isError = false; // Reset de l'état d'erreur

    this.http.post<any>(`${this.apiUrl}/verify-code`, null, {
      params: { email: this.email, code: this.code }
    }).subscribe({
      next: (user) => {
        // SUCCÈS : Fermeture de la modal de saisie
        this.showModal = false;

        // Affichage de la réponse avec le pseudo retrouvé
        Swal.fire({
          title: `Bonjour ${user.prenom || 'joueur'} ! 👋`,
          html: `Heureux de vous revoir.<br>Votre pseudo de jeu est : <br><b style="color:#23a6d5; font-size:1.6rem; letter-spacing:1px;">${user.username}</b>`,
          icon: 'success',
          background: 'rgba(255, 255, 255, 0.98)',
          backdrop: `rgba(0,0,0,0.4) blur(4px)`, // Flou élégant
          confirmButtonText: 'Retourner au Login',
          confirmButtonColor: '#23a6d5',
          showClass: {
            popup: 'animate__animated animate__zoomIn'
          }
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        // ERREUR : Le code est mauvais
        console.error("Erreur verifyCode:", err);
        this.isError = true;
        
        // On déclenche une petite vibration/shake via le CSS
        setTimeout(() => { 
          this.isError = false; 
        }, 600);
      }
    });
  }

  /**
   * Fermer manuellement la modal
   */
  closeModal() {
    this.showModal = false;
    this.code = '';
  }
}