import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-active-quizzes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './active-quizzes.html',
  styleUrls: ['./active-quizzes.css']
})
export class ActiveQuizzesComponent {
  recentQuizzes = [
    { id: 1, title: 'JavaScript Moderne', category: 'Tech', progress: 85, icon: 'bi-code-slash' },
    { id: 2, title: 'Histoire de l\'Afrique', category: 'Histoire', progress: 40, icon: 'bi-bank' },
    { id: 3, title: 'Calcul Mental', category: 'Maths', progress: 100, icon: 'bi-plus-slash-minus' },
    { id: 4, title: 'Angular 20 Essentials', category: 'Tech', progress: 15, icon: 'bi-lightning-fill' }
  ];
}