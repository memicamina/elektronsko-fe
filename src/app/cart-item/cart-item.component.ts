import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: CartItem
  @Output() increaseQty: EventEmitter<CartItem> = new EventEmitter();
  @Output() decreaseQty: EventEmitter<CartItem> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<CartItem> = new EventEmitter();
  faTrash=faTrash;
  constructor() { }

  ngOnInit(): void {
  }

  
  onRemove(item) {
    this.removeFromCart.emit(item);
  }

  onIncrease(item) {
    this.increaseQty.emit(item);
  }

  onDecrease(item) {
    this.decreaseQty.emit(item);
  }
}
