import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GiftModel } from '../models/gift.model';
import * as _ from 'lodash';
import { AppSettings } from '../appSettings';
import { OtherGiftModel } from '../models/othergift.model';

@Injectable()
export class GiftService {

  private baseUrl: string = 'gifts';

  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+this.baseUrl;
  }

  get url(): string {
    return AppSettings.API_REPO_ENDPOINT+this.baseUrl;
  }



  addGift(personneId: number, gift: GiftModel): Observable<GiftModel> {
    return this.http.post(this.apiUrl+'/'+personneId, gift)
      .map(res => res.json());
  }

  removeGift(personneId: number,giftId: number): Observable<any> {
    return this.http.delete(this.apiUrl+'/'+personneId+'/gift/'+giftId)
      .map(res => res.json());
  }

  updateGift(personneId: number, giftId: number, gift: GiftModel): Observable<GiftModel> {
    return this.http.post(this.apiUrl+'/'+personneId+'/gift/'+giftId, gift)
      .map(res => res.json());
  }

  updateGift2(giftId: number, gift: GiftModel): Observable<any> {
    return this.http.post(this.apiUrl+'/'+giftId+'/gift', gift)
      .map(res => res.json());
  }

  updateGift3(userId: number, giftId: number, gift: GiftModel): Observable<OtherGiftModel> {
    return this.http.post(this.apiUrl+`/${giftId}/gift/${userId}`, gift)
      .map(res => res.json());
  }





  loadAllOtherGiftsFrom(userId: number, eventId: number):Observable<Array<GiftModel>> {
    return this.http.get(this.url+`/search/findOtherUsersByEvent?userId=${userId}&eventId=${eventId}`)
      .map(res => res.json()._embedded.gifts);
  }


  loadOtherGiftsFrom(userId: number, eventId: number):Observable<Array<OtherGiftModel>> {
    return this.http.get(this.apiUrl+`/user/${userId}/event/${eventId}/other`)
      .map(res => res.json());
  }
}
