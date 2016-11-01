import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GiftModel } from '../models/gift.model';
import { AppSettings } from '../appSettings';
import { EventModel } from '../models/event.model';

@Injectable()
export class EventService {



  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+'events';
  }

  get url(): string {
    return AppSettings.API_REPO_ENDPOINT+'events';
  }


  loadEvents(): Observable<any> {
    return this.http.get(this.url)
      .map(res => res.json()._embedded.events);
  }

  loadEventsBy(userId: number): Observable<any> {
  return this.http.get(this.url+`/search/findEventByUser?userId=${userId}`)
    .map(res => res.json()._embedded.events);
  }

  loadEventById(eventId: number): Observable<EventModel> {
    return this.http.get(this.url+`/${eventId}`)
      .map(res => res.json());
  }

  addGift(gift: GiftModel): Observable<GiftModel> {
    return this.http.post(this.url, gift)
      .map(res => res.json());
  }


}
