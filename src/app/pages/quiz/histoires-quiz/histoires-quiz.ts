import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const histoireQuestions = [
  {
    question: "Qui était le premier président des États-Unis ?",
    options: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "John Adams", correct: false }
    ]
  },
  {
    question: "En quelle année a débuté la Révolution française ?",
    options: [
      { text: "1776", correct: false },
      { text: "1789", correct: true },
      { text: "1799", correct: false },
      { text: "1804", correct: false }
    ]
  },
  {
    question: "Quel empire était dirigé par Jules César ?",
    options: [
      { text: "Empire Grec", correct: false },
      { text: "Empire Romain", correct: true },
      { text: "Empire Perse", correct: false },
      { text: "Empire Mongol", correct: false }
    ]
  },
  {
    question: "Quel empire était dirigé par Jules César ?",
    options: [
      { text: "Empire Grec", correct: false },
      { text: "Empire Romain", correct: true },
      { text: "Empire Perse", correct: false },
      { text: "Empire Mongol", correct: false }
    ]
  },
  

];

@Component({
  selector: 'app-histoires-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './histoires-quiz.html',
  styleUrl: './histoires-quiz.css',
})
export class HistoiresQuizComponent implements OnInit, OnDestroy {
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
  totalHistoryXP: number = 0;
  
  timeLeft: number = 10;
  maxTime: number = 10;
  timerInterval: any;
  progressColor: string = '#f1c40f'; // Couleur Or pour l'histoire

  constructor(private router: Router) { }

  ngOnInit() {
    const savedLevels = localStorage.getItem('history_levels');
    const savedXP = localStorage.getItem('history_total_xp');
    if (savedLevels) this.levels = JSON.parse(savedLevels);
    if (savedXP) this.totalHistoryXP = parseInt(savedXP);
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
    this.progressColor = '#f1c40f';
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 3) this.progressColor = '#e74c3c';
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
    }, 500);
  }

  finishLevel() {
    this.gameState = 'result';
    if (this.currentLevelXP >= 80) {
      this.totalHistoryXP += this.currentLevelXP;
      localStorage.setItem('history_total_xp', this.totalHistoryXP.toString());
      const nextLevel = this.levels.find(l => !l.unlocked && this.totalHistoryXP >= l.requiredXP);
      if (nextLevel) {
        nextLevel.unlocked = true;
        localStorage.setItem('history_levels', JSON.stringify(this.levels));
      }
    }
  }

  generateQuestions() {
    return [...histoireQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  ngOnDestroy() { clearInterval(this.timerInterval); }
}