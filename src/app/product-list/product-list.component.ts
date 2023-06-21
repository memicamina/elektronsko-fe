import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  product: Product;
  products: Product[] = [];

  filteredStatus = '';

  filterForm: FormGroup;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getProducts().subscribe((pro: Product[]) => {
      this.products = pro;
      console.log(pro);
    });
  }
}
