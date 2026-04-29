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
  },
  {
    question: "Quel est le plus grand mammifère terrestre ?",
    options: [
      { text: "L'éléphant d'Afrique", correct: true },
      { text: "La girafe", correct: false },
      { text: "Le rhinocéros blanc", correct: false },
      { text: "L'hippopotame", correct: false }
    ]
  },
  {
    question: "Quelle est la formule chimique de l'or ?",
    options: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Fe", correct: false },
      { text: "Cu", correct: false }
    ]
  },
  {
    question: "Quelle est la planète la plus proche du soleil ?",
    options: [
      { text: "Vénus", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mercure", correct: true }
    ]
  },
  {
    question: "Quelle est la formule du calcul de l'énergie de masse? ",
    options: [
      { text: "E = m * c * c", correct: true },
      { text: "E = m * c", correct: false },
      { text: "E = m * c * c * c", correct: false },
      { text: "E = m * c * c * c * c", correct: false }
    ]
  },
  {
    question: "Quelle est la loi de la chute libre ? ",
    options: [
      { text: "F = m * a", correct: true },
      { text: "F = m * g", correct: false },
      { text: "F = m * a * g", correct: false },
      { text: "F = m * g * g", correct: false }
    ]
  },
  {
    question: "Quelle est la forme developpee de (a+b)² ? ",
    options: [
      { text: "a² + b²", correct: false },
      { text: "a² + b² + 2ab", correct: true },
      { text: "a² + b² + 4ab", correct: false },
      { text: "a² + b² + 3ab", correct: false }
    ]
  },
  {
    question: "Quelle est la forme developpee de (a-b)² ? ",
    options: [
      { text: "a² - b²", correct: false },
      { text: "a² - b² + 2ab", correct: false },
      { text: "a² - b² - 2ab", correct: true },
      { text: "a² - b² - 3ab", correct: false }
    ]
  },
  {
    question: "Quelle est la forme developpee de (a+b)(a-b) ? ",
    options: [
      { text: "a² - b²", correct: true },
      { text: "a² - b² + 2ab", correct: false },
      { text: "a² - b² - 2ab", correct: false },
      { text: "a² - b² - 3ab", correct: false }
    ]
  },
  {
    question: "Quelle est la loi de la conservation de l'énergie ? ",
    options: [
      { text: "E = m * c * c", correct: true },
      { text: "E = m * c", correct: false },
      { text: "E = m * c * c * c", correct: false },
      { text: "E = m * c * c * c * c", correct: false }
    ]
  },
  {
    question: "Quelle est la formule de la loi d'Ohm ? ",
    options: [
      { text: "U = R * I", correct: true },
      { text: "U = R * I * I", correct: false },
      { text: "U = R * I * I * I", correct: false },
      { text: "U = R * I * I * I * I", correct: false }
    ]
  },
  {
    question: "Quelle est la formule de la loi de Newton ? ",
    options: [
      { text: "F = m * a", correct: true },
      { text: "F = m * g", correct: false },
      { text: "F = m * a * g", correct: false },
      { text: "F = m * g * g", correct: false }
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
    { id: 3, unlocked: false, requiredXP: 160 },
    { id: 4, unlocked: false, requiredXP: 240 },
    { id: 5, unlocked: false, requiredXP: 320 },
    { id: 6, unlocked: false, requiredXP: 400 },
    { id: 7, unlocked: false, requiredXP: 480 },
    { id: 8, unlocked: false, requiredXP: 560 },
    { id: 9, unlocked: false, requiredXP: 640 },
    { id: 10, unlocked: false, requiredXP: 720 },
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
