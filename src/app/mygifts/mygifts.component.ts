import { Component, OnInit, Input } from '@angular/core';
import { PersonneModel } from '../models/personne.model';
import { PersonneService } from '../services/personne.service';
import { GiftModel } from '../models/gift.model';
import { GiftService } from '../services/gift.service';
import { Observable } from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'ec-my-gifts',
  templateUrl: './mygifts.component.html'
})
export class MyGifts implements OnInit {

  personne: PersonneModel;
  @Input() personneObs: Observable<PersonneModel>;
  gifts: Array<GiftModel>;
  displayAddGift: boolean = false;

  constructor(public giftService: GiftService, private personneService: PersonneService) {}

  ngOnInit() {

    this.personneObs.subscribe((value) => {
      this.personne = value;
      this.personneService.loadGiftFor(value.uid)
        .subscribe(gifts => this.gifts = gifts);
    });

  }

  addGift(event): void {
    if(_.isUndefined(event.uid)) {
      this.giftService.addGift(this.personne.uid, event)
        .subscribe(gift => {
          this.displayAddGift = false;
          this.gifts.push(gift);
        });

    } else {
      this.giftService.updateGift(this.personne.uid, event.uid, event)
        .subscribe(gift => {
          this.displayAddGift = false;
        });
    }

  }

  updateGift(event): void {
    this.giftService.updateGift(this.personne.uid, event.uid, event)
      .subscribe(gift => console.log(gift));
    this.displayAddGift = false;

  }

  removeGift(event): void {
    console.log("remove:"+event.name);
    this.giftService.removeGift(this.personne.uid, event.uid)
      .subscribe(res => {
        var index = this.gifts.indexOf(event, 0);
        if (index > -1) {
          this.gifts.splice(index, 1);
        }
      });
  }

  cancelGift(): void {
    this.displayAddGift = false;
  }


}
