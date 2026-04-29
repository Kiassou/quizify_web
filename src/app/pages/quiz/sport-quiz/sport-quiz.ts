import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-quiz',
  imports: [],
  templateUrl: './sport-quiz.html',
  styleUrl: './sport-quiz.css',
})
export class SportQuizComponent {
  constructor(private router: Router) { }

  backToHome() {
    this.router.navigate(['/quiz']);
  }
 }
