import {Component, OnInit} from '@angular/core';
import {CardService} from '../shared/card.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  // @ts-ignore
  public product: string;
  public grid = true;
  public filter = [
    {id: 1, value: 'Price first cheapest'},
    {id: 2, value: 'Price first expensive'},
    {id: 3, value: 'Alphabetically with "A" first'},
    {id: 4, value: 'Alphabetically with "Z" first'},
    {id: 5, value: 'Rating low first'},
    {id: 6, value: 'Rating high first'},
  ];
  selectedFilter = 1;
  private subscription: Subscription;

  constructor(public cardService: CardService, private router: Router, private route: ActivatedRoute) {
    this.subscription = route.params.subscribe(params => {
      return this.product = params['product'];
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.cardService.fetchAllInstruments(this.product).subscribe();
    });
  }

  gridLayout(): void {
    this.grid = true;
  }
  notGridLayout(): void {
    this.grid = false;
  }
  // SUPER SORT - IN THE WORLD!!!
  sortCards(id: number): void {
    if (id === 1) {
      this.cardService.cards.sort((a, b) => a.price > b.price ? 1 : -1);
    } else if (id === 2) {
      this.cardService.cards.sort((a, b) => a.price < b.price ? 1 : -1);
    } else if (id === 3) {
      this.cardService.cards.sort((a, b) => a.instrument_name > b.instrument_name ? 1 : -1);
    } else if (id === 4) {
      this.cardService.cards.sort((a, b) => a.instrument_name < b.instrument_name ? 1 : -1);
    } else if (id === 5) {
      this.cardService.cards.sort((a, b) => a.rating > b.rating ? 1 : -1);
    } else if (id === 6) {
      this.cardService.cards.sort((a, b) => a.rating < b.rating ? 1 : -1);
    } else {
      this.cardService.cards.sort((a, b) => a.price > b.price ? 1 : -1);
    }
  }
}
