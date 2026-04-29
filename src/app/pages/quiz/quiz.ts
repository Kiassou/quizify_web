// quiz.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz', // Assure-toi que le sélecteur correspond à ta route
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.css']
})
export class QuizComponent implements OnInit {
  userName: string = 'Champion';

  categories = [
    { id: 'sciences-quiz', name: 'Sciences', icon: 'bi-lightbulb-fill', count: 10, color: '#e73c7e' },
    { id: 'histoire-quiz', name: 'Histoire', icon: 'bi-bank', count: 10, color: '#23a6d5' },
    { id: 'tech-quiz', name: 'Tech', icon: 'bi-cpu-fill', count: 10, color: '#23d5ab' },
    { id: 'sport-quiz', name: 'Sport', icon: 'bi-trophy-fill', count: 10, color: '#ee7752' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedName = localStorage.getItem('username');
    if (storedName) this.userName = storedName;
  }

  // Fonction pour rediriger vers le quiz spécifique
  startQuiz(categoryId: string) {
    // Redirige vers /quiz/sciences, /quiz/tech, etc.
    this.router.navigate(['/quiz', categoryId]);
  }
}