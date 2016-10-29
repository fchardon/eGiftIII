import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GiftModel } from '../models/gift.model';
import { AppSettings } from '../appSettings';
import { UserModel } from '../models/user.model';
import { WishModel } from '../models/wish.model';
import { PersonneModel } from '../models/personne.model';

@Injectable()
export class WishService {

  private baseUrl: string = 'wishes';

  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+'/api/'+this.baseUrl;
  }

  get url(): string {
    return AppSettings.API_ENDPOINT+'/'+this.baseUrl;
  }

  addPersonneToWish(wishId: number, personneModel: PersonneModel): Observable<WishModel> {
    return this.http.put(this.apiUrl+'/'+wishId+'/personne', personneModel)
      .map(res => res.json());
  }

  loadWishUid(eventId: number, userId: number): Observable<number> {
    return this.http.get(this.url+'/search/findForEvent?eventId='+eventId+'&userId='+userId)
      .map(res => res.json().uid);
  }



  removePersonneToWish(wishId: number, personneId: number,): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+wishId+'/personne/'+personneId)
      .map(res => res.json());
  }


}
