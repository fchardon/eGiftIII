import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { PersonneModel} from '../models/personne.model';

@Component({
  selector: 'ec-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class Personne implements OnInit {

  @Input() isSelected: boolean;
  @Input() personne: PersonneModel;
  @Output() gift = new EventEmitter<PersonneModel>();
  @Output() cancel = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<PersonneModel>();
  @Output() remove = new EventEmitter<PersonneModel>();

  isHover: boolean = false;
  giftPersonne: boolean = false;
  editPersonne: boolean = false;
  displayEdit: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log("Init Personne:"+this.personne);
    if(this.personne == null){
      this.personne = new PersonneModel();
      this.editPersonne = true;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.displayEdit = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.displayEdit = false;
  }

  addClicked() {
    this.editPersonne = false;
    this.add.emit(this.personne);
    console.log("add");
  }

  cancelClicked() {
    this.editPersonne = false;
    this.cancel.emit(true);
  }

  displayGifts() {
    this.giftPersonne = true;
    this.gift.emit(this.personne);
  }

  isEdit(personneUid: number) {
    return personneUid === this.personne.uid;
  }

  removePersonne() {
    this.remove.emit(this.personne);

  }
}
