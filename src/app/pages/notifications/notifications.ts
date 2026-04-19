import { Component, OnInit } from '@angular/core'; // Corrigé
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NotificationItem {
  id: number;
  type: 'bg-challenge' | 'bg-trophy' | 'bg-social';
  icon: string;
  message: string;
  time: string;
  canAccept: boolean;
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.html', // Vérifie bien que le nom correspond à ton fichier HTML
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit {

  notifications: NotificationItem[] = [
    { 
      id: 1,
      type: 'bg-challenge', 
      icon: 'bi-cpu', 
      message: 'Moussa t\'a défié sur JavaScript Moderne !', 
      time: 'Il y a 2 min',
      canAccept: true,
      isRead: false
    },
    { 
      id: 2,
      type: 'bg-trophy', 
      icon: 'bi-star-fill', 
      message: 'Félicitations ! Tu as débloqué le badge "Expert".', 
      time: 'Il y a 1h',
      canAccept: false,
      isRead: false
    }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('Page de notifications chargée !');
  }

  markAsRead(id: number) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.isRead = true);
  }

  deleteNotif(id: number) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}