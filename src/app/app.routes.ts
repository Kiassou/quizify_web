import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard'; // On importe nos futurs gardiens

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // --- ROUTES PUBLIQUES (Accessibles uniquement si NON connecté) ---
  {
    path: 'login',
    canActivate: [guestGuard], // Si connecté, renvoie vers home-players
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./pages/forgot/forgot').then(m => m.ForgotComponent)
  },

  // --- ROUTES PRIVÉES (Accessibles uniquement si CONNECTÉ) ---
  {
    path: 'home-players',
    canActivate: [authGuard], // Si non connecté, renvoie vers login
    loadComponent: () =>
      import('./pages/home-players/home-players').then(m => m.HomePlayersComponent)
  },
  {
    path: 'home-admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-admin/home-admin').then(m => m.HomeAdminComponent)
  },
  {
    path: 'quiz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path: 'active-quizzes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/active-quizzes/active-quizzes').then(m => m.ActiveQuizzesComponent)
  },
  {
    path: 'leaderboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/leaderboard/leaderboard').then(m => m.LeaderboardComponent)
  },
  {
    path: 'challenge/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/challenge/challenge').then(m => m.ChallengePageComponent)
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/notifications/notifications').then(m => m.NotificationsComponent)
  },

  {
    path: 'sciences-quiz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/quiz/sciences-quiz/sciences-quiz').then(m => m.SciencesQuizComponent)
  },
  {
    path: 'histoires-quiz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/quiz/histoires-quiz/histoires-quiz').then(m => m.HistoiresQuizComponent)
  },
  {
    path: 'tech-quiz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/quiz/tech-quiz/tech-quiz').then(m => m.TechQuizComponent)
  },
  {
    path: 'sport-quiz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/quiz/sport-quiz/sport-quiz').then(m => m.SportQuizComponent)
  },


  // Redirection globale si la route n'existe pas
  { path: '**', redirectTo: 'home-players' }
];