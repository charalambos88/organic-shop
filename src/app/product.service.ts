import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
  	//create = push a product to the database.
  	return this.db.list('/products').push(product);
  }

  getAll(){
  	//get all products from the database.
  	return this.db.list('/products');
  }

  getProduct(productId){
  	return this.db.object('/products/' + productId);
  }

  update(productId, product){
  	return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
  	return this.db.object('/products/' + productId).remove();
  }
}
