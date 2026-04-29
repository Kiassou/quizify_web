import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-histoires-quiz',
  imports: [],
  templateUrl: './histoires-quiz.html',
  styleUrl: './histoires-quiz.css',
})
export class HistoiresQuizComponent {
    constructor(private router: Router) { }

  backToHome() {
    this.router.navigate(['/quiz']);
  }
 }
