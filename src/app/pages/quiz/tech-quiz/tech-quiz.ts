import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tech-quiz',
  imports: [],
  templateUrl: './tech-quiz.html',
  styleUrl: './tech-quiz.css',
})
export class TechQuizComponent {
  constructor(private router: Router) { }

  backToHome() {
    this.router.navigate(['/quiz']);
  }
 }
