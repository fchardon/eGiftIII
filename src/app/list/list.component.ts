import { Component, OnInit } from '@angular/core';
import { ListModel } from '../models/list.model';
import { ListService } from '../services/list.service';
import { MyListModel } from '../models/my-list.model';
import { Route, ActivatedRoute } from '@angular/router';
import { PersonneModel } from '../models/personne.model';
import { PersonneService } from '../services/personne.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { WishService } from '../services/wish.service';

@Component({
  selector: 'ec-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class List implements OnInit {

  myList: MyListModel = new MyListModel();
  personnes: Array<PersonneModel> = [];
  personneGift: PersonneModel;
  personneGiftObs: BehaviorSubject<PersonneModel>;
  wishUid: number = null;
  displayAddPersonne: boolean = false;

  constructor(private route:ActivatedRoute,private personneService:PersonneService, private wishService: WishService) {}

  ngOnInit() {
    this.personneGiftObs = new BehaviorSubject(new PersonneModel());
    //this.personneGiftObs = Observable.create((observer) => observer.next(new PersonneModel()));
    this.personneObs.subscribe((value) => console.log("List_ngOnInit"+value));
    let userId = this.route.snapshot.params['userId'];
    let listId = this.route.snapshot.params['listId'];
    let eventId = this.route.snapshot.params['eventId'];

    this.wishService.loadWishUid(eventId, userId)
      .subscribe(uid => {
        console.log("loadWishUid:"+uid);
        this.wishUid = uid;
        this.wishService.loadPersonnesByWish(uid)
          .subscribe(personnes => this.personnes = personnes);
      }
      );

  }

 get personneObs(): Observable<PersonneModel> {
   return this.personneGiftObs.asObservable();
 }

  newPersonneObs() : Observable<PersonneModel> {
    return this.personneGiftObs.asObservable();
  }

  opendAdd(){
    this.displayAddPersonne = true;

  }

  addPersonne(event) {
    this.displayAddPersonne = false;
    this.personnes.push(event);
    console.log("Add a new Personne"+event.name);
    this.wishService.addPersonneToWish(this.wishUid, event)
      .subscribe(personne => {
        event.uid = personne.uid;
        console.log("Personne Added");
      });

  }

  updatePersonne(event) {
    this.personneService.updatePersonne(event)
      .subscribe(p =>  console.log("Personne Updated"));
  }

  cancelAddPersonne() {
    this.displayAddPersonne = false;
    console.log("Cancel Add a new Personne");
  }

  displayGift(event) {
    //console.log("displayGift for "+event.uid);
    this.personneGift = event;
    this.personneGiftObs.next(event);
  }

  isSelected(personne: PersonneModel): boolean {
    if(this.personneGift != null) {
      return this.personneGift.uid == personne.uid;
    } else {
      return false;
    }
  }

  removePersonne(personneToRemove: PersonneModel) {
    this.wishService.removePersonneToWish(this.wishUid, personneToRemove.uid)
      .subscribe(personne => {
        var index = this.personnes.indexOf(personneToRemove, 0);
        if (index > -1) {
          this.personnes.splice(index, 1);
        }
      });
  }

}
