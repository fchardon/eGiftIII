import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/event.model';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html'
})
export class Home {

  events: Array<EventModel> = [];
  users: Array<UserModel> = [];
  displayLogin: boolean = false;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, private userService: UserService, private eventService: EventService) {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);

    this.userService.loadUsers().subscribe(users => {
      this.users = users;
    });


    this.eventService.loadEventsBy(this.appState.userId).subscribe(events => {
      console.log(events);
      this.events = events;
    });
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  isBeta(): boolean {
    return true;
  }

  showLogin(): void {
    this.displayLogin = true;
  }



  loadEvent(eventId: number) {
    console.log(eventId);
  }
}
