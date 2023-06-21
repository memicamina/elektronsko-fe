import { Injectable } from '@angular/core';
import {MessageService} from 'src/app/services/message.service'
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
      cartItems: CartItem[] = [];
      ukupnoKorpa: number = 0;

      constructor(private msg: MessageService) { 
        try {
            let dataB = localStorage.getItem('cart');
              console.log(dataB);
             try {this.cartItems = dataB!=null? JSON.parse(dataB): [];}
             catch(e) {
               this.cartItems = [];
             }
              try {this.cartItems.forEach(item => this.ukupnoKorpa += item.cena*item.kolicina);
              }
              catch(e) {
                this.ukupnoKorpa = 0;
              }
            }
            catch(e) {
              this.cartItems = [];
              this.ukupnoKorpa = 0;
            }
            }
            getCartItems() {
                return this.cartItems;
              }
              addToCart(product: Product) {
                let inCart = false;
            
                for(let i in this.cartItems) {
                  if(this.cartItems[i].IdProizvoda === product.IdProizvoda) {
                    this.cartItems[i].kolicina++
                    this.cartItems[i].dostupno--;
                    this.cartItems[i].ukupno = this.cartItems[i].cena*this.cartItems[i].kolicina;
                    inCart = true;
                    alert("Artikal se nalazi u korpi, kvantitet je promenjen.")
                    break;
                  }
              }
                if(!inCart) {
                  
                  var newItem = new CartItem(this.cartItems.length+1,product);
                  newItem.ukupno = newItem.cena;
                  newItem.dostupno = newItem.dostupno - 1;
                  this.cartItems.push(newItem);
                  this.ukupnoKorpa = 0;
                  this.cartItems.forEach(item => {
                  this.ukupnoKorpa += (item.cena * item.kolicina)})
                  this.saveCart(this.cartItems, this.ukupnoKorpa);
                  alert("Dodato u korpu!")
              }
            
                this.ukupnoKorpa = 0;
                this.cartItems.forEach(item => {
                  this.ukupnoKorpa += (item.cena * item.kolicina)
                this.saveCart(this.cartItems, this.ukupnoKorpa);
                });
              }

              
  increaseQty(item: CartItem) {
    var index = this.cartItems.indexOf(item);
    var selectedItem = this.cartItems[index];
   
    selectedItem.kolicina++;
    selectedItem.dostupno--;
    selectedItem.ukupno = selectedItem.cena*selectedItem.kolicina;
    
    this.ukupnoKorpa = 0;
    this.cartItems.forEach(item => {
     this.ukupnoKorpa += (item.cena * item.kolicina)

  }); 
     
    this.saveCart(this.cartItems, this.ukupnoKorpa);
}

  decreaseQty(item: CartItem) {
  var index = this.cartItems.indexOf(item);
  var selectedItem = this.cartItems[index];
  selectedItem.kolicina--;
  selectedItem.ukupno = selectedItem.cena*selectedItem.kolicina;

  if(selectedItem.kolicina<1) {
    this.cartItems = this.cartItems.filter(item => item.id !== selectedItem.id);
    this.ukupnoKorpa = 0;
    this.cartItems.forEach(item => {
     this.ukupnoKorpa += (item.cena * item.kolicina)});
    this.saveCart(this.cartItems, this.ukupnoKorpa);
  }
  
   this.ukupnoKorpa = 0;
   this.cartItems.forEach(item => {
   this.ukupnoKorpa += (item.cena * item.kolicina)
    this.saveCart(this.cartItems, this.ukupnoKorpa);
}); }
              removeFromCart(item: CartItem) {
                var index = this.cartItems.indexOf(item);
                var selectedItem = this.cartItems[index];
                this.cartItems = this.cartItems.filter(item => item.id !== selectedItem.id);
              
                this.ukupnoKorpa = 0;
                this.cartItems.forEach(item => {
                 this.ukupnoKorpa += (item.cena * item.kolicina)});
                this.saveCart(this.cartItems, this.ukupnoKorpa);
              }
            
              getTotal() {
                return this.ukupnoKorpa;
              }
              emptyCart() {
                this.cartItems = [];
                this.ukupnoKorpa = 0;
               this.saveCart(this.cartItems, this.ukupnoKorpa);
              }
            
              getItemsCount() {
                 var count = 0;
                 this.cartItems.forEach(item => count+=item.kolicina);
                 return count;
              }
            
              saveCart(cart: CartItem[], total:number) {
                 localStorage.setItem('cart',JSON.stringify(cart));
              }
  }