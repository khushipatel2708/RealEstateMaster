import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection: signalR.HubConnection;
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5026/notificationHub')
      .build();

    this.hubConnection.start().catch(err => console.error('Error starting SignalR:', err));

    this.hubConnection.on('ReceiveNotification', (message: string) => {
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([message, ...currentNotifications]);
    });
  }
}  