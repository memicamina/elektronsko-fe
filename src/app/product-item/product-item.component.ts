import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.services';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem : Product
  @Output() addToCart : EventEmitter<Product> = new EventEmitter()

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onAdd(productItem) {
    this.cartService.addToCart(productItem);
  }

}
