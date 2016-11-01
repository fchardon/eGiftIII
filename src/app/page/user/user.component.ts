import { Component, HostListener } from '@angular/core';
import { AppState } from '../../app.service';
import { Title } from './title';
import { XLarge } from './x-large';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';

@Component({
  providers: [],
  templateUrl: './user.template.html',
  styleUrls: ['./user.style.css'],
})
export class UserComponent {

  events: Array<EventModel>;
  display: boolean = false;
  // TypeScript public modifiers
  constructor(public appState: AppState, private route: ActivatedRoute, private eventService: EventService) {

  }

  ngOnInit() {
    let id = this.route.snapshot.params['userId'];
    this.appState.userId = id;
    this.eventService.loadEventsBy(id)
      .subscribe(events => this.events = events);

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.display = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.display = false;
  }

  get userId(): number {
    return this.appState.userId;
  }

  get eventId(): number {
    return this.appState.eventId;
  }

}
