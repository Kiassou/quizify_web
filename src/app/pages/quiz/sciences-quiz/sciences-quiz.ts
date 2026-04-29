import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sciences-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sciences-quiz.html',
  styleUrl: './sciences-quiz.css',
})
export class SciencesQuizComponent {
  constructor(private router: Router) { }

  backToHome() {
    this.router.navigate(['/quiz']);
  }

}
