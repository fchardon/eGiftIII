import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.service';

@Component({
  selector: 'ec-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class Menu implements OnInit {

  navbarCollapsed = true;

  constructor(private appState: AppState) {}

  ngOnInit() {
  }

  get listId(): number {
    return this.appState.listId;
  }

  get eventId(): number {
    return this.appState.eventId;
  }

  get userId(): number {
    return this.appState.userId;
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
