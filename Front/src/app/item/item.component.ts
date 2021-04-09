import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardService} from '../shared/card.service';
import {RootService} from '../shared/root.service';
import {CartService} from '../shared/cart.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(public cardService: CardService,
              public cartService: CartService,
              public rootService: RootService,
              private route: ActivatedRoute) {
  }

  // @ts-ignore
  public id: number = null;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data => this.id = +data);

    this.route.params.subscribe(() => {
      this.cardService.fetchInstrument(this.id).subscribe();
    });
  }
}
