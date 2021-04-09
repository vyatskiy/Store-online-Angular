import {Component} from '@angular/core';
import {RootService} from '../shared/root.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public rootService: RootService) {
  }

  items = JSON.parse(localStorage.getItem('cart') as string) || [];

  increase(index: number): void {
    const temp = this.items.map((item: { id: number; }) => {
      if (item.id === index) {
        // @ts-ignore
        item.count++;
      }
      return item;
    });
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(temp));
  }

  decrease(index: number): void {
    const temp = this.items.map((item: { id: number; }) => {
      if (item.id === index) {
        // @ts-ignore
        if (item.count <= 1) {
          return item;
        }
        // @ts-ignore
        item.count--;
      }
      return item;
    });
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(temp));
  }

  totalPrice(): number {
    let total = 0;
    this.items.map((item: { price: number; count: number; }) => {
      total += item.price * item.count;
    });
    return total;
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item: { id: number; }) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  allCount(): number {
      let count = 0;

      if (JSON.parse(localStorage.getItem('cart') as string) !== null) {
        const temp = JSON.parse(localStorage.getItem('cart') as string);
        temp.map((item: { count: number; }) => {
          count += item.count;
        });
      }
      return count;
    }
}
