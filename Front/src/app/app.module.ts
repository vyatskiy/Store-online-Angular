import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import {MainComponent} from './main/main.component';
import {NavComponent} from './nav/nav.component';
import {MenuComponent} from './menu/menu.component';
import {ContentComponent} from './content/content.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CardsComponent} from './cards/cards.component';
import {CartComponent} from './cart/cart.component';
import {ErrorComponent} from './error/error.component';
import {ItemComponent} from './item/item.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MainComponent,
    NavComponent,
    MenuComponent,
    ContentComponent,
    SidebarComponent,
    CardsComponent,
    CartComponent,
    ErrorComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
