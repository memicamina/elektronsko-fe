import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { AdminService } from '../services/admin.service';
import { CartService } from '../services/cart.services';
import { UserService } from '../services/user.service';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';
import { Kuponi } from '../models/kuponi';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css'],
})
export class MycartComponent implements OnInit {
  items: CartItem[] = [];
  ukupnoKorpa: number = 0;

  kuponi: Kuponi[] = [];
  code: number = 1;
  constructor(
    private cartService: CartService,
    protected router: Router,
    private userService: UserService,
    private adm: AdminService
  ) {}

  ngOnInit(): void {
    this.ukupnoKorpa = this.cartService.getTotal();
    this.getItems();
    this.getKuponi();
  }

  getTotalCart() {
    this.ukupnoKorpa = this.cartService.getTotal();
  }
  getItems() {
    this.items = this.cartService.getCartItems();
  }

  getKuponi() {
    this.adm
      .getCoupons()
      .subscribe(
        (kuponi) => (this.kuponi = kuponi.filter((c) => c.validan == 1))
      );
  }
  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
    this.getTotalCart();
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
    this.getItems();
    this.getTotalCart();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.getItems();
    this.getTotalCart();
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.getItems();
    this.getTotalCart();
  }

  checkAuth() {
    return this.userService.checkAuth();
  }

  finishOrder() {
    if (this.checkAuth() == false) {
      alert(
        'Molimo Vas da se prijavite ili registrujte kako bi završili porudžbinu.'
      );
    } else {
      let discount = 0;
      let IdPorudzbine = 1;
      let ukupnaCena = this.ukupnoKorpa;
      let user = this.userService.currentUser();
      let datumP = new Date().toLocaleString();
      let cond = 0;
      let ccode = this.code;
      let kupon = this.kuponi.find((c) => c.kod_kupona == ccode);
      if (kupon !== undefined) {
        discount = kupon.popust;
        cond = kupon.stanje;
        if (this.ukupnoKorpa >= cond) {
          ukupnaCena = ukupnaCena - this.ukupnoKorpa * (discount / 100);
        } else ukupnaCena = this.ukupnoKorpa;
      } else {
        ukupnaCena = this.ukupnoKorpa;
      }
      let order = new Order(0, datumP, ukupnaCena, user, 'ne');
      this.userService.makeOrder(order).subscribe((res) => {
        console.log(res);
        IdPorudzbine = res.IdPorudzbine;
        this.items.forEach((item) => {
          let oitem = new OrderItem(
            IdPorudzbine,
            item.IdProizvoda,
            item.dostupno,
            item.cena
          );
          //  this.userService.makeOrderItem(oitem).subscribe(res => console.log("success item"));
        }),
          setTimeout(() => {
            // this.userService
            //   .getOrderInfo(IdPorudzbine, user)
            //   .subscribe((res) => console.log(res));
            this.emptyCart();
          }, 750);
      });
      alert('Hvala Vam na kupovini.Za uplatu : ' + ukupnaCena);
    }
  }

  iskoristiKupon() {}
  setCode(code: number) {
    this.code = code;
  }
}
