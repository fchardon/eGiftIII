import { Component, OnInit } from '@angular/core';
import { ListModel } from '../models/list.model';
import { AppState } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'ec-lists',
  templateUrl: './lists.component.html'
})
export class Lists implements OnInit {

  lists: Array<ListModel> = [{ id:12, name:'Noel 2016'}];

  // My USer Id
  userId: number = 1;

  constructor(private appState: AppState, private route: ActivatedRoute, private listService:ListService) {}

  ngOnInit() {
    this.listService.loadEvents(this.userId)
      .subscribe(list => this.lists = list);
  }

  loadList(listId: number) {
    //this.appState.listId = listId;
    //this.router.navigate(['/lists', listId]);
  }


}
