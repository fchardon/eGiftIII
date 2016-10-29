import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { MyListModel } from '../models/my-list.model';
import { Http } from '@angular/http';
import { AppSettings } from '../appSettings';
import { ListModel } from '../models/list.model';

@Injectable()
export class ListService {

  private baseUrl: string = 'wishes';

  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+'/api/'+this.baseUrl;
  }

  get url(): string {
    return AppSettings.API_ENDPOINT+'/'+this.baseUrl;
  }



  loadMyListForEvent(eventId: number, userId: number): Observable<MyListModel> {
    return this.http.get(this.url+'/search/findForEvent?eventId=${eventId}&userId=${userId}')
      .map(res => res.json());
  }

  loadMyList(listId: number, userId: number):Observable<MyListModel> {
      return this.http.get(this.apiUrl+'/${listId}/my-list/${userId}')
        .map(res => res.json());
  }

  loadEvents(userId: number): Observable<ListModel[]> {
    return this.http.get(this.url+'/${userId}/my-events')
      .map(res => res.json());
  }

}
