import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private getItem(cartId: string, productId: string) {
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

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId(); //returns a promise
    let item$ = this.getItem(cartId, product.$key);
    //gia na min kanoume unsub.. xrisimopoioume to take(1), kratame kathe fora ena stoixeio.
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove()
        else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
}
