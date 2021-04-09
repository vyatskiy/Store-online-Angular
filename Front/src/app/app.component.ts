import {Component, OnInit} from '@angular/core';
import {CardService} from './shared/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public cardService: CardService) {
  }

  ngOnInit(): void {
    this.cardService.fetchAll().subscribe();
  }
}
