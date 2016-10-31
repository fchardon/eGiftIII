import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GiftModel } from '../models/gift.model';
import { AppSettings } from '../appSettings';
import { PersonneModel } from '../models/personne.model';

@Injectable()
export class PersonneService {

  private baseUrl: string = 'personnes';

  constructor(private http: Http) {
  }

  get apiUrl(): string {
    return AppSettings.API_ENDPOINT+this.baseUrl;
  }

  get url(): string {
    return AppSettings.API_REPO_ENDPOINT+this.baseUrl;
  }

  loadPersonne(userId: number, eventId: number):Observable<Array<PersonneModel>> {
    return this.http.get(this.url+`/search/findFor?userId=${userId}&eventId=${eventId}`)
      .map(res => res.json()._embedded.personnes);
  }


  loadGiftFor(personneId):Observable<Array<GiftModel>> {
    return this.http.get(this.url+'/'+personneId+'/gifts')
      .map(res => res.json()._embedded.gifts);
  }



  updatePersonne(personneModel: PersonneModel):Observable<Array<PersonneModel>> {
    return this.http.post(this.apiUrl+'/'+personneModel.uid, personneModel)
      .map(res => res.json());
  }


  addGift(gift: GiftModel): Observable<GiftModel> {
    return this.http.post('http://localhost:8080/api/gifts', gift)
      .map(res => res.json());
  }



}
