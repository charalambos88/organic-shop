import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  //epeidi exoume idi ton kodika gia import to cart, opote kanoume input.
  @Input('cart') cart:ShoppingCart;

  constructor() { }
}
