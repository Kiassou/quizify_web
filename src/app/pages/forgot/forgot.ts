import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './forgot.html',
  styleUrls: ['./forgot.css']
})


// ... (imports inchangés)

export class ForgotComponent {
  email: string = '';
  code: string = '';
  loading: boolean = false;
  showModal: boolean = false;
  errorInCode: boolean = false; // On garde uniquement celle-ci

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  sendEmail() {
    if (!this.email.trim()) return;
    this.loading = true;

    this.http.post(`${this.apiUrl}/send-code`, null, { 
      params: { email: this.email },
      responseType: 'text' 
    }).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges(); // Sécurité pour le spinner sur mobile
      })
    ).subscribe({
      next: () => {
        this.showModal = true;
      },
      error: (err) => {
        console.error("Erreur sendEmail:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: 'Email introuvable ou erreur serveur.',
          confirmButtonColor: '#e73c7e'
        });
      }
    });
  }

  verifyCode() {
    if (!this.code.trim()) return;
    this.errorInCode = false; 

    this.http.post<any>(`${this.apiUrl}/verify-code`, null, {
      params: { email: this.email, code: this.code }
    }).subscribe({
      next: (user) => {
        this.showModal = false;
        Swal.fire({
          title: `Bonjour ${user.prenom || 'joueur'} ! 👋`,
          html: `Heureux de vous revoir.<br>Votre pseudo de jeu est : <br><b style="color:#23a6d5; font-size:1.6rem; letter-spacing:1px;">${user.username}</b>`,
          icon: 'success',
          background: 'rgba(255, 255, 255, 0.98)',
          backdrop: `rgba(0,0,0,0.4) blur(4px)`,
          confirmButtonText: 'Retourner au Login',
          confirmButtonColor: '#23a6d5'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error("Erreur verifyCode:", err);
        this.errorInCode = true; // ✅ On utilise bien la variable du HTML
        
        // On retire l'erreur après 600ms pour pouvoir re-déclencher l'animation
        setTimeout(() => { 
          this.errorInCode = false; 
        }, 600);
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.code = '';
    this.errorInCode = false;
  }
}