import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-player',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home-players.html',
  styleUrls: ['./home-players.css']
})
export class HomePlayersComponent implements OnInit {
getCategoryColor(arg0: string) {
throw new Error('Method not implemented.');
}
  searchQuery: string = '';
  userName: string = 'Joueur'; // Valeur par défaut
  
  // Statistiques (peuvent être récupérées via un service plus tard)
  stats = {
    points: 1250,
    rank: 4,
    completed: 15
  };

  // Liste des quiz avec ID (obligatoire pour le routerLink et la compilation)
  get recentQuizzesLimit() {
  return this.recentQuizzes.slice(0, 4);
}
  recentQuizzes = [
    { 
      id: 1, 
      title: 'JavaScript Moderne', 
      category: 'Tech', 
      progress: 85, 
      icon: 'bi-code-slash' 
    },
    { 
      id: 2, 
      title: 'Histoire de l\'Afrique', 
      category: 'Histoire', 
      progress: 40, 
      icon: 'bi-bank' 
    },
    { 
      id: 3, 
      title: 'Calcul Mental', 
      category: 'Maths', 
      progress: 100, 
      icon: 'bi-plus-slash-minus' 
    },
    { 
      id: 4, 
      title: 'Angular 20 Essentials', 
      category: 'Tech', 
      progress: 15, 
      icon: 'bi-lightning-fill' 
    }
  ];

  categories = ['Tous', 'Sciences', 'Tech', 'Histoire', 'Sport'];

  constructor(private router: Router) {}

  ngOnInit() {
    // Récupération des infos utilisateur stockées au moment du Login
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // On affiche le nom s'il existe, sinon le pseudo
      this.userName = user.nom || user.username || 'Kiassou';
    }
    
    this.generateWeek();
  }

  // Dans ta classe de composant
 weekDays: any[] = [];
 todayIndex: number = 0;


  generateWeek() {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date().getDay(); 
    // getDay() donne 0 pour Dimanche, on le réajuste pour que Dimanche soit le 7ème jour (index 6)
    this.todayIndex = today === 0 ? 6 : today - 1;

    this.weekDays = days.map((label, index) => ({
        label: label,
        isPast: index < this.todayIndex,
        isToday: index === this.todayIndex,
        isFuture: index > this.todayIndex,
        dayNum: index + 1 // Utile pour envoyer vers la page défi
    }));
 }

  /**
   * Logique de déconnexion chic avec SweetAlert2
   */
  logout() {
    Swal.fire({
      title: 'Déconnexion',
      text: "Voulez-vous vraiment vous déconnecter ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e73c7e', // Couleur chic (accent)
      cancelButtonColor: '#23a6d5',  // Couleur chic (primary)
      confirmButtonText: 'Oui, quitter',
      cancelButtonText: 'Annuler',
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: `rgba(35, 166, 213, 0.4) blur(8px)` // Flou d'arrière-plan
    }).then((result) => {
      if (result.isConfirmed) {
        // Nettoyage des données de session
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirection immédiate
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Méthode pour filtrer les quiz (optionnel pour la barre de recherche)
   */
  get filteredQuizzes() {
    return this.recentQuizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}