import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.css']
})
export class LeaderboardComponent {
  // Liste des joueurs à partir du 4ème rang
  otherPlayers = [
    { name: 'Kiassou', xp: 3950 },
    { name: 'Moussa_Dev', xp: 3800 },
    { name: 'Hama_Smart', xp: 3500 },
    { name: 'ReactLover', xp: 3200 },
    { name: 'FlutterKing', xp: 2900 },
    { name: 'JavaWarrior', xp: 2500 }
  ];
}