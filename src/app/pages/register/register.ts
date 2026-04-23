import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs';

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
  isShake: boolean = false;

  private apiUrl = `${environment.apiUrl}/users/register`;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  register() {
    if (!this.nom.trim() || !this.prenom.trim() || !this.username.trim() || !this.email.trim()) {
      this.triggerError("Tous les champs sont requis ! 📋");
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
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: () => {
          this.messageSuccess = "Bienvenue dans l'aventure Quizify ! 🚀";
          this.cdr.detectChanges();
          setTimeout(() => this.router.navigate(['/login']), 2500);
        },
        error: (err) => {
          console.error(err);
          const msg = (err.status === 409 || err.status === 400) 
            ? "Pseudo ou Email déjà utilisé... 🧐" 
            : "Le serveur boude, réessaye plus tard ! 🛠️";
          this.triggerError(msg);
        }
      });
  }

  private triggerError(msg: string) {
    this.messageError = msg;
    this.isShake = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.messageError = '';
      this.isShake = false;
      this.cdr.detectChanges();
    }, 3500);
  }

  // Petit bonus : calcul du pourcentage de complétion du formulaire
  get formProgress(): number {
    let count = 0;
    if (this.nom.trim()) count++;
    if (this.prenom.trim()) count++;
    if (this.username.trim()) count++;
    if (this.email.trim()) count++;
    return (count / 4) * 100;
  }
}