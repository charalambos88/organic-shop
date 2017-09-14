import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  //private not to call from the outside
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    //if cartid exists return it
    if (cartId) return cartId;
    //else return the below
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

    // the same as the above, but using the async method of ts
    // this.create().then(result => {
    //   localStorage.setItem('cartId', result.key);
    //   this.getCart(result.key);
    // });
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId(); //returns a promise
    let item$ = this.getItem(cartId, product.$key);
    //gia na min kanoume unsub.. xrisimopoioume to take(1), kratame kathe fora ena stoixeio.
    item$.take(1).subscribe(item => {
      item$.update({product: product, quantity: (item.quantity || 0) + change});
    });
  }
}
