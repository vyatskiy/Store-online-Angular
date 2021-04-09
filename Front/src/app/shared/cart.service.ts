import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CartService {
  constructor() {
  }

  addToCart(card: object, event: any): void {
    event.stopPropagation();
    const cart = [];
    if (localStorage.hasOwnProperty('cart')) {
      const temp = JSON.parse(localStorage.getItem('cart') as string);
      // @ts-ignore
      card.count = 1;
      temp.push(card);
      localStorage.setItem('cart', JSON.stringify(temp));
    }
    else {
      // @ts-ignore
      card.count = 1;
      cart.push(card);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
  checkInCart(id: number): boolean {
    if (!localStorage.hasOwnProperty('cart')) { return false; }
    else {
      if (localStorage.getItem('cart') === null) { return false; }
      const temp = JSON.parse(localStorage.getItem('cart') as string);
      return temp.find((item: { id: number; }) => item.id === id);
    }
  }
}
