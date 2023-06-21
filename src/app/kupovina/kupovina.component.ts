import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Kupovina } from '../models/kupovina';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-kupovina',
  templateUrl: './kupovina.component.html',
  styleUrls: ['./kupovina.component.css']
})
export class KupovinaComponent implements OnInit {

  constructor(private productService: ProductsService,private fb:FormBuilder) { }

  kupovina:Kupovina;
  kupovine:Kupovina[]=[];
  ngOnInit(): void {
    this.getAllProduct();
  }

  
  getAllProduct() {
    this.productService.getKupovina().subscribe((pro: Kupovina[]) => {
      this.kupovine = pro})
  }
}
