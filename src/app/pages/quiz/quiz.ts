import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {
  userName: string = 'Champion'; // À récupérer depuis le localStorage ou ton service AuthService
  
  categories = [
    { name: 'Sciences', icon: 'bi-lightbulb-fill', count: 12, color: '#e73c7e' },
    { name: 'Histoire', icon: 'bi-bank', count: 8, color: '#23a6d5' },
    { name: 'Tech', icon: 'bi-cpu-fill', count: 15, color: '#23d5ab' },
    { name: 'Sport', icon: 'bi-trophy-fill', count: 10, color: '#ee7752' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Récupérer le nom stocké au login
    const storedName = localStorage.getItem('username');
    if (storedName) this.userName = storedName;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
} 