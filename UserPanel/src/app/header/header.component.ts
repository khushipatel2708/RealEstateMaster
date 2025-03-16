import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  showHeader: boolean = true;
constructor(private router: Router){}
  ngOnInit(){
  this.router.events.subscribe(() => {
    this.showHeader = this.router.url !== '/login' && this.router.url !== '/sign-up'; // Hide header if on login page
  });
}
}
