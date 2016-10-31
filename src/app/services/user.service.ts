import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GiftModel } from '../models/gift.model';
import { AppSettings } from '../appSettings';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+'users';
  }

  get url(): string {
    return AppSettings.API_REPO_ENDPOINT+'users';
  }

  loadUsers(): Observable<Array<UserModel>> {
    return this.http.get(this.url)
      .map(res => res.json()._embedded.users);
  }


  loadOtherUsersFromEvent(eventId: number, userId: number):Observable<Array<UserModel>> {
    return this.http.get(this.url+'/search/findOtherUsersByEvent?eventId='+eventId+'&userId='+userId)
      .map(res => res.json()._embedded.users);
  }




}
