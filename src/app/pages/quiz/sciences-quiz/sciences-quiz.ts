import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const scienceQuestions = [
  {
    question: "Quel est le symbole chimique de l'eau ?",
    options: [
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "HO", correct: false }
    ]
  },
  {
    question: "Quelle planète est surnommée la planète rouge ?",
    options: [
      { text: "Vénus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturne", correct: false }
    ]
  },
  {
    question: "Quel est l'organe principal du système respiratoire ?",
    options: [
      { text: "Le cœur", correct: false },
      { text: "Les poumons", correct: true },
      { text: "Le foie", correct: false },
      { text: "L'estomac", correct: false }
    ]
  },
  {
    question: "Quelle est la force qui nous retient au sol ?",
    options: [
      { text: "Le magnétisme", correct: false },
      { text: "La gravité", correct: true },
      { text: "L'inertie", correct: false },
      { text: "La friction", correct: false }
    ]
  },
  {
    question: "Quel est le gaz le plus abondant dans l'atmosphère terrestre ?",
    options: [
      { text: "L'oxygène", correct: false },
      { text: "Le dioxyde de carbone", correct: false },
      { text: "L'azote", correct: true },
      { text: "L'hydrogène", correct: false }
    ]
  }
];

@Component({
  selector: 'app-sciences-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sciences-quiz.html',
  styleUrl: './sciences-quiz.css',
})
export class SciencesQuizComponent {
  constructor(private router: Router) { }

  gameState: 'selection' | 'playing' | 'result' = 'selection';
  levels = [
    { id: 1, unlocked: true, requiredXP: 0 },
    { id: 2, unlocked: false, requiredXP: 80 },
    { id: 3, unlocked: false, requiredXP: 200 },
    { id: 4, unlocked: false, requiredXP: 400 },
    { id: 5, unlocked: false, requiredXP: 600 },
    { id: 6, unlocked: false, requiredXP: 800 },
    { id: 7, unlocked: false, requiredXP: 1000 },
    { id: 8, unlocked: false, requiredXP: 1200 },
    { id: 9, unlocked: false, requiredXP: 1400 },
    { id: 10, unlocked: false, requiredXP: 1600 },
  ];

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentLevelXP: number = 0;
  timeLeft: number = 0;
  maxTime: number = 20;
  timerInterval: any;

  progressColor: string = '#23d5ab';

  selectLevel(level: any) {
    if (level.unlocked) {
      this.startLevel(level.id);
    }
  }

  startLevel(levelId: number) {
    this.gameState = 'playing';
    this.currentQuestionIndex = 0;
    this.currentLevelXP = 0;
    this.timeLeft = this.maxTime;
    this.questions = this.generateQuestions(levelId);
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 5) {
        this.progressColor = '#e74c3c';
      } else {
        this.progressColor = '#23d5ab';
      }

      if (this.timeLeft <= 0) {
        this.endRound(false);
      }
    }, 1000);
  }

  submitAnswer(index: number) {
    if (this.questions[this.currentQuestionIndex].options[index].correct) {
      // Réponse correcte
      const xpToAdd = Math.floor((this.timeLeft / this.maxTime) * 10); // Bonus temps
      this.currentLevelXP += xpToAdd;
      // Animation de feedback visuel ici...
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= 10) {
      this.endRound(true);
    }
  }

  endRound(completed: boolean) {
    clearInterval(this.timerInterval);
    if (completed && this.currentLevelXP >= 80) {
      this.completeLevel();
    }
    this.gameState = 'result';
  }

  completeLevel() {
    // Mettre à jour le niveau actuel dans le tableau
    const levelIndex = this.levels.findIndex(l => l.id === (this.currentQuestionIndex / 10));
    if (levelIndex !== -1 && levelIndex < this.levels.length - 1) {
      this.levels[levelIndex + 1].unlocked = true;
      // Sauvegarder dans le localStorage
      localStorage.setItem('science_levels', JSON.stringify(this.levels));
    }
  }

  generateQuestions(level: number) {
    const qs = [];
    const basePool = [...scienceQuestions];
    
    for (let i = 0; i < 10; i++) {
      const q = basePool[Math.floor(Math.random() * basePool.length)];
      // Adapter la difficulté si besoin
      qs.push(q);
    }
    return qs;
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
