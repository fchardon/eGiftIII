import { PersonneModel } from './personne.model';
export class MyListModel {
  id: number;
  name: string;
  personnes: Array<PersonneModel> = [];

  constructor() {
    
  }
}
