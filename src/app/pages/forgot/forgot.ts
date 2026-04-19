import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './forgot.html',
  styleUrls: ['./forgot.css']
})
export class ForgotComponent {
  email: string = '';
  code: string = '';
  loading: boolean = false;
  showModal: boolean = false;
  isError: boolean = false; // Pour l'effet de secousse (shake)

  private apiUrl = 'http://localhost:8080/users';
errorInCode: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  sendEmail() {
    if (!this.email) return;
    this.loading = true;

    this.http.post(`${this.apiUrl}/send-code`, null, { 
      params: { email: this.email },
      responseType: 'text' 
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.showModal = true;
        this.cdr.detectChanges(); // Force l'ouverture immédiate
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Email introuvable ou problème serveur.',
          confirmButtonColor: '#e73c7e'
        });
      }
    });
  }

  verifyCode() {
    if (!this.code) return;
    this.isError = false;

    this.http.post<any>(`${this.apiUrl}/verify-code`, null, {
      params: { email: this.email, code: this.code }
    }).subscribe({
      next: (user) => {
        // LE CODE EST CORRECT : Fermeture auto de la modal de saisie
        this.showModal = false;

        // Affichage de la modal de succès Ultra-Chic
        Swal.fire({
          title: `Bonjour ${user.nom} ! 👋`,
          html: `Ravi de vous revoir !<br>Votre pseudo est : <b style="color:#e73c7e; font-size:1.4rem;">${user.username}</b>`,
          icon: 'success',
          background: 'rgba(255, 255, 255, 0.95)',
          backdrop: 'rgba(35, 166, 213, 0.4)', // Flou bleuté en arrière-plan
          confirmButtonText: 'Aller au Login',
          confirmButtonColor: '#23a6d5',
          showClass: { popup: 'animate__animated animate__backInDown' }
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        // LE CODE EST FAUX : La modal reste, on déclenche la secousse
        this.isError = true;
        setTimeout(() => { this.isError = false; }, 500); // Reset de l'animation
      }
    });
  }
}