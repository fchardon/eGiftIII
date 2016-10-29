import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { GiftModel } from '../models/gift.model';
import * as _ from 'lodash';

@Component({
  selector: 'ec-my-gift',
  templateUrl: './mygift.component.html',
  styleUrls: ['./mygift.component.css']
})
export class MyGift implements OnInit {

  @Input() gift: GiftModel;

  @Output() add = new EventEmitter<GiftModel>();
  @Output() cancel = new EventEmitter<GiftModel>();
  @Output() remove = new EventEmitter<GiftModel>();

  editGift: boolean = false;
  displayEdit: boolean = false;
  constructor() {}

  ngOnInit() {
    console.log("Init Personne:"+this.gift);
    if(this.gift == null){
      this.gift = new GiftModel();
      this.editGift = true;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.displayEdit = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.displayEdit = false;
  }

  takePicture() {

  }

  containsLink(gift: GiftModel): boolean {
    return !_.isUndefined(gift.url) || !_.isNull(gift.url) ;
  }

  addClicked(): void {
    console.log("addClicked:"+this.gift.name);
    /*if(!_.isUndefined(this.gift.url)) {
      if(this.gift.url.indexOf('http://') < 0){
        this.gift.url = 'http://'+this.gift.url;
      }
    }*/
    this.editGift = false;
    this.add.emit(this.gift);
  }

  removeGifts() {
    console.log("removeGifts:"+this.gift.name);
    this.remove.emit(this.gift);
  }

  cancelClicked(): void {
    this.editGift = false;
    this.cancel.emit(this.gift);
  }

}
