import { Component } from '@angular/core';

import { AppState } from '../../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { EventModel } from '../models/event.model';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './event.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './event.template.html'
})
export class EventComponent {

  users: Array<UserModel>;

  // TypeScript public modifiers
  constructor(public appState: AppState, private route: ActivatedRoute, private userService: UserService,
              private eventService: EventService) {

  }

  ngOnInit() {
    //let id = this.route.snapshot.params['eventId'];
    this.route.params.subscribe(params => {
      let id = +params['eventId'];
      this.eventService.loadEventById(id)
        .subscribe(event => {
          this.appState.eventName = event.name;
          this.appState.eventId = event.uid;
        });
      this.userService.loadOtherUsersFromEvent(this.appState.userId, id)
        .subscribe(users => this.users = users);
    });



  }

}
