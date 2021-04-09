import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {CartComponent} from './cart/cart.component';
import {ErrorComponent} from './error/error.component';
import {ItemComponent} from './item/item.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AboutGuard} from './guard/auth.guard';

const routes: Routes = [
  {path: 'product/:product', component: MainComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent, canActivate: [AboutGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AboutGuard]},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AboutGuard],
})
export class AppRoutingModule {
}
