import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

export interface Card {
  id: number;
  instrument_name: string;
  description: string;
  src: string;
  price: number;
  rating: number;
}

@Injectable({providedIn: 'root'})
export class CardService {
  cards: Card[] = [];
  allCards: Card[] = [];
  // @ts-ignore
  card: Card = {};

  constructor(private http: HttpClient, private router: Router) {
  }

  fetchAll(): Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:8081/api/instrument')
      .pipe(tap(response => {
          this.allCards = response;
        }
      ));
  }

  fetchAllInstruments(product: string): Observable<Card[]> {
    console.log(product);
    return this.http.get<Card[]>(`http://localhost:8081/api/instrument/${product}`)
      .pipe(tap(response => {
          this.cards = response;
          this.cards.sort((a, b) => a.price > b.price ? 1 : -1);
        },
        error => {
          console.error(error);
          this.router.navigateByUrl('/product/mobile')
            .then(() => {
              console.log('Что-то пошло не так');
            });
          return error;
        }
      ));
  }

  fetchInstrument(id: number): Observable<Card> {
    return this.http.get<Card>(`http://localhost:8081/api/instrument/item${id}`)
      .pipe(tap(response => {
          console.log(response);
          this.card = response;
        },
        error => {
          console.log('Что-то пошло не так', error);
          return error;
        }
      ));
  }
}
