import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
  	//get the data of categories from database.
  	return this.db.list('categories', {
  		query: {
  			orderByChild: 'name' //στοιχιση ανα ονοματος, bychild
  		}
  	});
  }

}
