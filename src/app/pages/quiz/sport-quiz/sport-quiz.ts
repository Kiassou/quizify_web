import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const sportQuestions = [
  {
    question: "Combien de joueurs composent une équipe de football sur le terrain ?",
    options: [
      { text: "7 joueurs", correct: false },
      { text: "11 joueurs", correct: true },
      { text: "9 joueurs", correct: false },
      { text: "12 joueurs", correct: false }
    ]
  },
  {
    question: "Dans quel sport utilise-t-on un 'puck' (palet) ?",
    options: [
      { text: "Basketball", correct: false },
      { text: "Hockey sur glace", correct: true },
      { text: "Tennis", correct: false },
      { text: "Rugby", correct: false }
    ]
  },
  {
    question: "Quelle est la distance d'un marathon ?",
    options: [
      { text: "21.1 km", correct: false },
      { text: "42.195 km", correct: true },
      { text: "10 km", correct: false },
      { text: "50 km", correct: false }
    ]
  },
  {
    question: "Qui détient le record du monde du 100m masculin ?",
    options: [
      { text: "Carl Lewis", correct: false },
      { text: "Usain Bolt", correct: true },
      { text: "Tyson Gay", correct: false },
      { text: "Yohan Blake", correct: false }
    ]
  },
  {
    question: "Dans quel sport peut-on marquer un 'Home Run' ?",
    options: [
      { text: "Football Américain", correct: false },
      { text: "Cricket", correct: false },
      { text: "Baseball", correct: true },
      { text: "Rugby", correct: false }
    ]
  },
  {
    question: "Quelle ville a accueilli les Jeux Olympiques d'été en 2016 ?",
    options: [
      { text: "Athènes", correct: false },
      { text: "Rio de Janeiro", correct: true },
      { text: "Londres", correct: false },
      { text: "Tokyo", correct: false }
    ]
  },
  {
    question: "Quel athlète est surnommé 'The King' dans le monde du basket ?",
    options: [
      { text: "Michael Jordan", correct: false },
      { text: "Kobe Bryant", correct: false },
      { text: "LeBron James", correct: true },
      { text: "Shaquille O'Neal", correct: false }
    ]
  },
  {
    question: "Laquelle de ces disciplines n'est PAS un sport olympique ?",
    options: [
      { text: "Escrime", correct: false },
      { text: "Natation synchronisée", correct: false },
      { text: "Pétanque", correct: true },
      { text: "Pentathlon moderne", correct: false }
    ]
  },
    {
    question: "Quelle nation domine historiquement le classement des médailles d'or aux Jeux d'hiver ?",
    options: [
      { text: "Canada", correct: false },
      { text: "États-Unis", correct: false },
      { text: "Allemagne", correct: false },
      { text: "Norvège", correct: true }
    ]
  },
  {
    question: "Quel est le sport national de l'Inde ?",
    options: [
      { text: "Cricket", correct: false },
      { text: "Kabaddi", correct: false },
      { text: "Football", correct: false },
      { text: "Hockey sur gazon", correct: true }
    ]
  },
  {
    question: "Dans une compétition de natation, qu'est-ce que 'l'crawl' ?",
    options: [
      { text: "Une médaille", correct: false },
      { text: "Une distance", correct: false },
      { text: "Une nage", correct: true },
      { text: "Un accessoire", correct: false }
    ]
  },
  {
    question: "Qui est considéré comme le 'Père du Basketball' ?",
    options: [
      { text: "Phil Knight", correct: false },
      { text: "James Naismith", correct: true },
      { text: "Adolph Rupp", correct: false },
      { text: "Michael Jordan", correct: false }
    ]
  },
  {
    question: "Combien de points vaut généralement un 'touchdown' au football américain ?",
    options: [
      { text: "3 points", correct: false },
      { text: "6 points", correct: true },
      { text: "7 points", correct: false },
      { text: "10 points", correct: false }
    ]
  },
  {
    question: "Quel est le nom de la ligue professionnelle de basketball aux États-Unis ?",
    options: [
      { text: "NBA", correct: true },
      { text: "NFL", correct: false },
      { text: "MLB", correct: false },
      { text: "NHL", correct: false }
    ]
  },
  {
    question: "En Formule 1, que signifie l'acronyme 'DRS' ?",
    options: [
      { text: "Drag Reduction System", correct: true },
      { text: "Deflection Ratio Sensor", correct: false },
      { text: "Dynamic Racing Speed", correct: false },
      { text: "Direct Race Strategy", correct: false }
    ]
  },
  {
    question: "Quel pays a remporté la première Coupe du Monde de Football en 1930 ?",
    options: [
      { text: "Brésil", correct: false },
      { text: "Allemagne", correct: false },
      { text: "France", correct: false },
      { text: "Uruguay", correct: true }
    ]
  },
    {
    question: "Quel est le sport de combat où l'on porte des gants de boxe et où les rounds durent 3 minutes ?",
    options: [
      { text: "Kick-boxing", correct: false },
      { text: "Muay Thai", correct: false },
      { text: "Boxe anglaise", correct: true },
      { text: "MMA", correct: false }
    ]
  },
  {
    question: "Lors d'un tournoi de tennis, qu'est-ce qu'un 'Grand Chelem' ?",
    options: [
      { text: "Une victoire finale", correct: false },
      { text: "Un set gagné 6-0", correct: false },
      { text: "Gagner les 4 tournois majeurs sur une année", correct: true },
      { text: "Un double", correct: false }
    ]
  },
  {
    question: "Quel équipement est essentiel pour la pratique du hockey sur glace ?",
    options: [
      { text: "Un casque et une crosse", correct: true },
      { text: "Un bouclier et une épée", correct: false },
      { text: "Des patins et un bâton de polo", correct: false },
      { text: "Une combinaison de plongée", correct: false }
    ]
  },
  {
    question: "Qui a marqué 'Le But du Siècle' lors de la Coupe du Monde 1986 ?",
    options: [
      { text: "Michel Platini", correct: false },
      { text: "Diego Maradona", correct: true },
      { text: "Pelé", correct: false },
      { text: "Zinedine Zidane", correct: false }
    ]
  },
  {
    question: "Dans quel sport les athlètes effectuent-ils un 'Saut en Hauteur' ?",
    options: [
      { text: "Athlétisme", correct: true },
      { text: "Gymnastique artistique", correct: false },
      { text: "Patinage artistique", correct: false },
      { text: "Escalade", correct: false }
    ]
  },
  {
    question: "Quelle célèbre golfeuse a remporté 18 tournois majeurs ?",
    options: [
      { text: "Nancy Lopez", correct: false },
      { text: "Annika Sörenstam", correct: false },
      { text: "Mickey Wright", correct: false },
      { text: "Patty Berg", correct: true }
    ]
  },
  {
    question: "Dans le cyclisme sur piste, quel type de course se court en duel sur une distance de 2000m ou 3000m ?",
    options: [
      { text: "Le Keirin", correct: false },
      { text: "La Vitesse Individuelle", correct: true },
      { text: "L'Omnium", correct: false },
      { text: "Le Scratch", correct: false }
    ]
  },
  {
    question: "Combien de points marque un 'slam dunk' (panier dunké) au basketball ?",
    options: [
      { text: "1 point", correct: false },
      { text: "2 points", correct: true },
      { text: "3 points", correct: false },
      { text: "4 points", correct: false }
    ]
  }
];

@Component({
  selector: 'app-sport-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-quiz.html',
  styleUrl: './sport-quiz.css',
})
export class SportQuizComponent implements OnInit, OnDestroy {
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
  totalSportXP: number = 0;
  
  timeLeft: number = 10;
  maxTime: number = 10;
  timerInterval: any;
  progressColor: string = '#ee7752'; // Orange Sport

  constructor(private router: Router) { }

  ngOnInit() {
    const savedLevels = localStorage.getItem('sport_levels');
    const savedXP = localStorage.getItem('sport_total_xp');
    if (savedLevels) this.levels = JSON.parse(savedLevels);
    if (savedXP) this.totalSportXP = parseInt(savedXP);
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
    this.progressColor = '#ee7752';
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 3) this.progressColor = '#ff3f34';
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
      this.totalSportXP += this.currentLevelXP;
      localStorage.setItem('sport_total_xp', this.totalSportXP.toString());
      const nextLevel = this.levels.find(l => !l.unlocked && this.totalSportXP >= l.requiredXP);
      if (nextLevel) {
        nextLevel.unlocked = true;
        localStorage.setItem('sport_levels', JSON.stringify(this.levels));
      }
    }
  }

  generateQuestions() {
    return [...sportQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }

  ngOnDestroy() { clearInterval(this.timerInterval); }
}