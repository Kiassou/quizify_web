import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const techQuestions = [
  {
    question: "Que signifie l'acronyme HTML ?",
    options: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Modern Language", correct: false },
      { text: "Hyper Transfer Model Line", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Lequel de ces frameworks est basé sur TypeScript ?",
    options: [
      { text: "React", correct: false },
      { text: "Angular", correct: true },
      { text: "Django", correct: false },
      { text: "Laravel", correct: false }
    ]
  },
  {
    question: "Quelle commande Git permet de cloner un dépôt ?",
    options: [
      { text: "git copy", correct: false },
      { text: "git push", correct: false },
      { text: "git clone", correct: true },
      { text: "git pull", correct: false }
    ]
  },
  {
    question: "Quel est le moteur de recherche développé par Google ?",
    options: [
      { text: "Bing", correct: false },
      { text: "Yahoo", correct: false },
      { text: "Google", correct: true },
      { text: "DuckDuckGo", correct: false }
    ]
  },
  {
    question: "Lequel de ces langages est orienté objet ?",
    options: [
      { text: "C", correct: false },
      { text: "Java", correct: true },
      { text: "PHP", correct: false },
      { text: "HTML", correct: false }
    ]
  }
];

@Component({
  selector: 'app-tech-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-quiz.html',
  styleUrl: './tech-quiz.css',
})
export class TechQuizComponent implements OnInit, OnDestroy {
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
  totalTechXP: number = 0;
  
  timeLeft: number = 10;
  maxTime: number = 10;
  timerInterval: any;
  progressColor: string = '#00ffcc'; // Turquoise néon

  constructor(private router: Router) { }

  ngOnInit() {
    const savedLevels = localStorage.getItem('tech_levels');
    const savedXP = localStorage.getItem('tech_total_xp');
    if (savedLevels) this.levels = JSON.parse(savedLevels);
    if (savedXP) this.totalTechXP = parseInt(savedXP);
  }

  selectLevel(level: any) {
    if (level.unlocked) this.startLevel(level.id);
  }

  startLevel(levelId: number) {
    this.gameState = 'playing';
    this.currentQuestionIndex = 0;
    this.currentLevelXP = 0;
    this.questions = this.generateQuestions();
    this.loadQuestion();
  }

  loadQuestion() {
    this.timeLeft = this.maxTime;
    this.progressColor = '#00ffcc';
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 3) this.progressColor = '#ff0055';
      if (this.timeLeft <= 0) this.submitAnswer(-1);
    }, 1000);
  }

  submitAnswer(index: number) {
    clearInterval(this.timerInterval);
    if (index !== -1 && this.questions[this.currentQuestionIndex].options[index].correct) {
      this.currentLevelXP += 10;
    }
    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < 10) this.loadQuestion();
      else this.finishLevel();
    }, 400);
  }

  finishLevel() {
    this.gameState = 'result';
    if (this.currentLevelXP >= 80) {
      this.totalTechXP += this.currentLevelXP;
      localStorage.setItem('tech_total_xp', this.totalTechXP.toString());
      const nextLevel = this.levels.find(l => !l.unlocked && this.totalTechXP >= l.requiredXP);
      if (nextLevel) {
        nextLevel.unlocked = true;
        localStorage.setItem('tech_levels', JSON.stringify(this.levels));
      }
    }
  }

  generateQuestions() {
    return [...techQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  ngOnDestroy() { clearInterval(this.timerInterval); }
}