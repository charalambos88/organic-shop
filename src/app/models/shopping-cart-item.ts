import { Product } from './product';

export class ShoppingCartItem {
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    
    constructor(init?: Partial<ShoppingCartItem>) {}
    get totalPrice() { return this.price * this.quantity; }
}