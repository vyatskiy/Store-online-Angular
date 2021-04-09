import {Component, Input} from '@angular/core';
import {CartService} from '../shared/cart.service';
import {RootService} from '../shared/root.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  // @ts-ignore
  @Input() card: Card = {};
  @Input() grid = true;

  constructor(public rootService: RootService, public cartService: CartService) {}
}
