import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() notifications: string[] = [];
  @Input() isSidebarOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }
}
