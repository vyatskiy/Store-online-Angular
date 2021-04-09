import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  // tslint:disable-next-line:variable-name
  customer_name = '';
  email = '';
  password = '';
  customer = {};

  constructor(private http: HttpClient, private router: Router) {
  }

  fetchRegister(): any {
    return this.http.post('http://localhost:8081/api/register', {
      customer_name: this.customer_name,
      email: this.email,
      password: this.password
    }).subscribe((response) => {
      this.customer = response;

      // @ts-ignore
      localStorage.setItem('jwt', JSON.stringify(this.customer.token));
      // @ts-ignore
      localStorage.setItem('customer_name', JSON.stringify(this.customer.user.name));

      this.router.navigate(['product/mobile']);

      this.customer_name = '';
      this.email = '';
      this.password = '';
    }, error => {
      console.log(error);
    });
  }

  fetchLogin(): any {
    return this.http.post('http://localhost:8081/api/login', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      this.customer = response;
      console.log(this.customer);
      // @ts-ignore
      localStorage.setItem('jwt', JSON.stringify(this.customer.token));
      // @ts-ignore
      localStorage.setItem('customer_name', JSON.stringify(this.customer.user.name));

      this.router.navigate(['product/mobile']);

      this.email = '';
      this.password = '';
    }, error => {
      console.log(error);
    });
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('customer_name');
  }

  isLogIn(): boolean {
    return (localStorage.getItem('jwt') === null);
  }

  getCustomer(): string {
    return (JSON.parse(localStorage.getItem('customer_name') as string));
  }
}
