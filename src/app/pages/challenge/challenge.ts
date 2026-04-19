import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  templateUrl: './challenge.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./challenge.css']
})
export class ChallengePageComponent implements OnInit {
  challengeId: number = 0;
  currentDayName: string = '';
  challengeTitle: string = '';
  challengeDescription: string = '';
  challengeXp: number = 0;
  challengeLevel: string = '';

  private missions = [
    { title: 'Blitz Tech', desc: 'Réponds à 10 questions sur Angular en moins de 2 minutes.', xp: 150, level: 'Expert' },
    { title: 'Passé Présent', desc: 'Fais un sans-faute sur le quiz Histoire de l\'Afrique.', xp: 100, level: 'Normal' },
    { title: 'Sprint Logique', desc: 'Résous 5 problèmes de logique sans aucune erreur.', xp: 200, level: 'Légendaire' },
    { title: 'Omniscient', desc: 'Obtiens 80% de réussite dans 3 catégories différentes.', xp: 120, level: 'Difficile' }
  ];

  // On injecte ActivatedRoute pour lire l'ID dans l'URL
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. Récupérer l'ID passé dans l'URL (ex: /challenge/3)
    const idParam = this.route.snapshot.paramMap.get('id');
    this.challengeId = idParam ? Number(idParam) : new Date().getDay();

    // 2. Déterminer le nom du jour en fonction de l'ID (1=Lundi, ..., 7=Dimanche)
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    // On ajuste car l'ID vient de 1-7 et le tableau commence à 0
    this.currentDayName = days[this.challengeId - 1] || days[0];

    // 3. Sélectionner la mission (on utilise l'ID pour que la mission soit fixe par jour)
    const missionIndex = (this.challengeId - 1) % this.missions.length;
    const mission = this.missions[missionIndex];

    this.challengeTitle = mission.title;
    this.challengeDescription = mission.desc;
    this.challengeXp = mission.xp;
    this.challengeLevel = mission.level;
  }

  startChallenge() {
    console.log(`Décollage pour la mission ${this.challengeTitle} !`);
    // Ici, tu pourras rediriger vers le quiz réel
  }
}