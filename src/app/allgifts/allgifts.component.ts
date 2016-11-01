import { Component, OnInit, Input } from '@angular/core';
import { PersonneModel } from '../models/personne.model';
import { PersonneService } from '../services/personne.service';
import { GiftModel } from '../models/gift.model';
import { GiftService } from '../services/gift.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { OtherGiftModel } from '../models/othergift.model';



@Component({
  selector: 'ec-allgifts',
  templateUrl: './allgifts.component.html'
})
export class AllGifts implements OnInit {

 gifts: Array<OtherGiftModel> = [];

  constructor(private route:ActivatedRoute,private giftService: GiftService, private userService: UserService) {}

  ngOnInit() {

    // Change with observable
    this.route.params.subscribe(params => {
      let eventId = +params['eventId'];
      let userId = +params['userId'];
      this.giftService.loadOtherGiftsFrom(userId, eventId)
        .subscribe(gifts => this.gifts = gifts);
    });

  }





  isReserve(gift: GiftModel): boolean{
    return gift.status === 'RESERVE';

  }

  isAchete(gift: GiftModel): boolean{
    return gift.status === 'ACHETE';
 }

  isDisponible(gift: GiftModel): boolean{
    return gift.status === 'DISPONIBLE';
  }

  isAnnulable(gift: GiftModel): boolean{
    return gift.status === 'ACHETE' || gift.status === 'RESERVE';
  }

  reserver(gift: GiftModel): void {
    gift.status = 'RESERVE';
    this.giftService.updateGift2(gift.uid, gift).subscribe(res => console.log(res));
  }

  annuler(gift: GiftModel): void {
    gift.status = 'DISPONIBLE';
    this.giftService.updateGift2(gift.uid, gift).subscribe(res => console.log(res));
  }

  acheter(gift: GiftModel): void {
    gift.status = 'ACHETE';
    this.giftService.updateGift2(gift.uid, gift).subscribe(res => console.log(res));
  }


}
