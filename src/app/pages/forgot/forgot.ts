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


export class ForgotComponent {
  email: string = '';
  code: string = '';
  loading: boolean = false;
  showModal: boolean = false;
  errorInCode: boolean = false;

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  sendEmail() {
    if (!this.email.trim()) return;
    this.loading = true;

    this.http.post(`${this.apiUrl}/send-code`, null, { 
      params: { email: this.email },
      responseType: 'text' 
    }).pipe(
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.code = ''; // On vide le code avant d'ouvrir la modal
        this.showModal = true;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Utilisateur inconnu',
          text: 'Cet email n\'existe pas dans notre base de données. ✨',
          confirmButtonColor: '#23a6d5'
        });
      }
    });
  }

  verifyCode() {
    if (this.code.length < 6) return;
    this.errorInCode = false;

    this.http.post<any>(`${this.apiUrl}/verify-code`, null, {
      params: { email: this.email, code: this.code }
    }).subscribe({
      next: (user) => {
        this.showModal = false;
        Swal.fire({
          title: `Bien joué ${user.prenom} !`,
          html: `Voici ton pseudo : <br><b style="color:#23a6d5; font-size:1.8rem;">${user.username}</b>`,
          icon: 'success',
          confirmButtonText: 'C\'est parti !',
          confirmButtonColor: '#23d5ab'
        }).then(() => this.router.navigate(['/login']));
      },
      error: () => {
        this.errorInCode = true;
        this.code = ''; // On réinitialise pour retaper
        setTimeout(() => { this.errorInCode = false; this.cdr.detectChanges(); }, 1000);
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.code = '';
    this.errorInCode = false;
  }
}