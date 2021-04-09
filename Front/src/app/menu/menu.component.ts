import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  public product: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.subscription = route.params.subscribe(params => this.product = params['product']);
  }

  ngOnInit(): void {
  }
}
