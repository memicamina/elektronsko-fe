import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import {
  makeOrderURL,
  orderItemURL,
  orderInfoURL,
  myProfileURL,
  myOrdersURL,
  updateMeURL,
  signupURL,
  loginURL,
  newFriseurURL,
  porudzbine_uplataURL,
  mojiZahtevi_obukaURL,
  mojiZahteviURL,
} from 'src/app/config/api';
import { MessageService } from './message.service';
import { Customer } from '../models/customer';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import { Friseur } from '../models/friseur';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myUser = null;
  auth: boolean = false;
  admin: number = 0;
  isAdmin: boolean = false;
  isFriseur: boolean = false;
  isMusterija: boolean = false;
  myAdmin: string = null;
  adminCode = 0;

  constructor(
    private http: HttpClient,
    private msg: MessageService,
    protected router: Router
  ) {}

  register(user: User): Observable<User> {
    console.log('AMINAAA');
    return this.http.post<User>(signupURL, JSON.stringify(user)).pipe(
      tap((_) => this.log('signed up!')),
      catchError(this.handleError)
    );
  }

  login(customer: Customer): Observable<any> {
    return this.http.post<Customer>(loginURL, JSON.stringify(customer)).pipe(
      tap((_) => this.log('login success!')),
      catchError(this.handleError)
    );
  }

  getMe(email: string): Observable<User> {
    return this.http.get<any>(`${myProfileURL}?email=${email}`).pipe(
      tap((_) => this.log('me success!')),
      catchError(this.handleErrorLR)
    );
  }

  getMyOrders(email: string): Observable<any> {
    return this.http.get(`${myOrdersURL}?email=${email}`).pipe(
      tap((_) => this.log('my orders success!')),
      catchError(this.handleErrorLR)
    );
  }

  editMe(data) {
    return this.http.post(updateMeURL, JSON.stringify(data)).pipe(
      tap((_) => this.log('my update success!')),
      catchError(this.handleError)
    );
  }

  makeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(makeOrderURL, JSON.stringify(order)).pipe(
      tap((_) => this.log('order success!')),
      catchError(this.handleError)
    );
  }

  makeOrderItem(oitem: OrderItem) {
    // return this.http.post<OrderItem>(orderItemURL, JSON.stringify(oitem)).pipe(
    //   tap((_) => this.log('order item success!')),
    //   catchError(this.handleError)
    // );
  }

  getOrderInfo(IdPorudzbine: number, email: string) {
    return this.http
      .get(`${orderInfoURL}?id=${IdPorudzbine}&email=${email}`)
      .pipe(
        tap((_) => this.log('mail success!')),
        catchError(this.handleError)
      );
  }

  private log(message: string) {
    this.msg.add(`User service: ${message}`);
  }

  handleError(error: HttpErrorResponse) {
    //console.log("Error! Somtehing went wrong.",error);
    alert(JSON.stringify(error.error));
    return throwError('Something went wrong');
  }

  handleErrorLR() {
    console.log('Error! Somtehing went wrong. User does not exits');
    alert(JSON.stringify('Korisnik ne postoji'));
    try {
      sessionStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
    return throwError('Something went wrong');
  }

  handleErrorZahtev() {
    console.log('Error! Somtehing went wrong. User does not exits');

    try {
      alert(JSON.stringify('Nemate zahteva.'));
    } catch (e) {
      console.log(e);
    }
    return throwError('Something went wrong');
  }

  checkAuth() {
    try {
      let token = sessionStorage.getItem('user');
      this.myUser = token;
    } catch (e) {
      this.myUser = null;
    }
    if (this.myUser !== null) {
      this.auth = true;
    } else {
      this.auth = false;
    }
    return this.auth;
  }

  checkAdmin() {
    try {
      let token = sessionStorage.getItem('user');
      this.adminCode = JSON.parse(sessionStorage.getItem('codeA'));
      // this.myAdmin = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
      this.myAdmin = token;
    } catch (e) {
      this.myAdmin = null;
    }
    // todo GetAdmins metoda PHP da lista sve admine //
    if (this.adminCode == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    return this.isAdmin;
  }

  checkMusterija() {
    try {
      let token = sessionStorage.getItem('user');
      this.adminCode = JSON.parse(sessionStorage.getItem('codeA'));
      // this.myAdmin = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
      this.myAdmin = token;
    } catch (e) {
      this.myAdmin = null;
    }
    // todo GetAdmins metoda PHP da lista sve admine //
    if (this.adminCode == 1) {
      this.isMusterija = false;
    } else {
      this.isMusterija = true;
    }
    return this.isMusterija;
  }

  checkFrizer() {
    try {
      let token = sessionStorage.getItem('user');
      this.adminCode = JSON.parse(sessionStorage.getItem('codeA'));
      // this.myAdmin = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
      this.myAdmin = token;
    } catch (e) {
      this.myAdmin = null;
    }
    // todo GetAdmins metoda PHP da lista sve admine //
    if (this.adminCode == 2) {
      this.isFriseur = true;
    } else {
      this.isFriseur = false;
    }
    return this.isFriseur;
  }

  getMyZahtev(email: string): Observable<any> {
    return this.http.get(`${mojiZahtevi_obukaURL}?email=${email}`).pipe(
      tap((_) => this.log('Prikaz zahteva!')),
      catchError(this.handleErrorZahtev)
    );
  }

  getZahteviMusterije(email: string): Observable<any> {
    return this.http.get(`${mojiZahteviURL}?email=${email}`).pipe(
      tap((_) => this.log('Prikaz zahteva!')),
      catchError(this.handleErrorZahtev)
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('codeA');
    //  sessionStorage.removeItem('codeB');
  }

  currentUser() {
    let token = sessionStorage.getItem('user');
    // let token1 = sessionStorage.getItem('frizer');
    //let me = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
    return token;
    // return token1;
  }
}
