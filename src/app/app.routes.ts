import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot',
    loadComponent: () =>
      import('./pages/forgot/forgot').then(m => m.ForgotComponent)
  },
  {
    path: 'home-players',
    loadComponent: () =>
      import('./pages/home-players/home-players').then(m => m.HomePlayersComponent)
  },
  {
    path: 'home-admin',
    loadComponent: () =>
      import('./pages/home-admin/home-admin').then(m => m.HomeAdminComponent)
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./pages/quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path:'active-quizzes',
    loadComponent: () =>
      import('./pages/active-quizzes/active-quizzes').then(m => m.ActiveQuizzesComponent)
  },
  {
    path:'leaderboard',
    loadComponent: () =>
      import('./pages/leaderboard/leaderboard').then(m => m.LeaderboardComponent)
  },
  {
    path:'challenge/:id',
    loadComponent: () =>
      import('./pages/challenge/challenge').then(m => m.ChallengePageComponent)
  },
];