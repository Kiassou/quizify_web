import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
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
  // Variables existantes
  unreadNotifications = 5;
  searchQuery: string = '';
  userName: string = 'Joueur';
  activeModal: string | null = null;
  
  // NOUVELLES variables pour responsive
  isMobile = false;
  searchExpanded = false;
  dropdownOpen = false;
  
  // Statistiques
  stats = {
    points: 1250,
    rank: 4,
    completed: 15
  };

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
  weekDays: any[] = [];
  todayIndex: number = 0;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.nom || user.username || 'Kiassou';
    }
    
    this.generateWeek();
    this.checkMobile();
  }

  // ✅ GESTION RESPONSIVE
  @HostListener('window:resize')
  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.searchExpanded = false; // Ferme la recherche sur desktop
    }
  }

  // ✅ Toggle recherche mobile
  toggleSearch() {
    this.searchExpanded = !this.searchExpanded;
  }

  // ✅ Toggle dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // ✅ Ferme dropdown en cliquant ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.dropdownOpen = false;
    }
  }

  get recentQuizzesLimit() {
    return this.recentQuizzes.slice(0, 4);
  }

  generateWeek() {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date().getDay(); 
    this.todayIndex = today === 0 ? 6 : today - 1;

    this.weekDays = days.map((label, index) => ({
      label: label,
      isPast: index < this.todayIndex,
      isToday: index === this.todayIndex,
      isFuture: index > this.todayIndex,
      dayNum: index + 1
    }));
  }

  // ✅ Modals corrigés
  openModal(type: string) {
    this.activeModal = type;
    this.dropdownOpen = false; // Ferme le dropdown
    this.searchExpanded = false; // Ferme la recherche
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.activeModal = null;
    document.body.classList.remove('modal-open');
  }

  // ✅ Logout avec fermeture propre
  logout() {
    this.dropdownOpen = false;
    Swal.fire({
      title: 'Déconnexion',
      text: "Voulez-vous vraiment vous déconnecter ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e73c7e',
      cancelButtonColor: '#23a6d5',
      confirmButtonText: 'Oui, quitter',
      cancelButtonText: 'Annuler',
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: `rgba(35, 166, 213, 0.4) blur(8px)`
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  get filteredQuizzes() {
    return this.recentQuizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Méthode manquante
  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Tech': '#e73c7e',
      'Histoire': '#23a6d5',
      'Maths': '#f39c12',
      'Sciences': '#27ae60',
      'Sport': '#9b59b6'
    };
    return colors[category] || '#3498db';
  }
}