import {Component, OnInit} from '@angular/core';
import {Card, CardService} from '../shared/card.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  jwt = '';
  search = '';
  isClickUser = false;
  filteredItems: Card[] = [];

  constructor(public cardService: CardService, public authService: AuthService, private router: Router) {
    router.events.subscribe(() => {
      this.search = '';
      this.filteredItems = [];
    });
  }

  ngOnInit(): void {
    this.jwt = JSON.parse(localStorage.getItem('jwt') as string);
    console.log(this.jwt);
  }

  countItems(): number {
    if (JSON.parse(localStorage.getItem('cart') as string) !== null) {
      return JSON.parse(localStorage.getItem('cart') as string).length;
    } else {
      return 0;
    }
  }

  searchItem(): void {
    console.log(this.cardService.allCards);
    if (this.search.trim().length > 0) {
      this.filteredItems = this.cardService.allCards.filter(item => item.instrument_name
          .toLowerCase()
          .indexOf(this.search.trim().toLowerCase()) + 1);
    } else {
      this.filteredItems = [];
    }
  }

  userHandler(): void {
    this.isClickUser = !this.isClickUser;
  }
}
