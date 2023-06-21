import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Suppliers } from '../models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  supplier: Suppliers;
  suppliers: Suppliers[]=[];

  product: Product;
  products: Product[]=[];
 
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  catForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  catLoad = false;
  subCA = false;
  selectedOne: Product = null;

  constructor(private ps: ProductsService,protected router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initCreateForm();
    this.initEditForm();
    this.getSuppliers();
    this.getProducts();
  }

  getSuppliers() {
    this.ps.getSuppliers().subscribe((sp: Suppliers[]) => {
      this.suppliers = sp})
  }

  
  getProducts() {
    this.ps.getProducts().subscribe((pro: Product[]) => {
      this.products = pro})
  }

  
initCreateForm() {
  this.createForm = this.fb.group({
     naziv: ['', Validators.required],
     cena: ['', Validators.required],
     dostupnost: ['', Validators.required],
     IdDobavljaca: ['', Validators.required]
  })
}


initEditForm() {
  this.editForm = this.fb.group({
    IdProizvoda: ['', Validators.required],
    nazivE: ['', Validators.required],
    dostupnostE: ['', Validators.required],
    cenaE: ['', Validators.required],
    IdDobavljacaE: ['', Validators.required]
  })
}



selectOne(product: Product) {
  this.selectedOne = product;
  this.editForm.patchValue({
    IdProizvoda: this.selectedOne.IdProizvoda,
    nazivE: this.selectedOne.naziv,
    dostupnostE: this.selectedOne.dostupnost,
    cenaE: this.selectedOne.cena,
    IdDobavljacaE: this.selectedOne.IdDobavljaca
  })
}


deleteOne(id: number) {
  this.ps.deleteProduct(id).subscribe(
    response => {
      this.getProducts();
      alert("Proizvod je obrisan!");
      console.log(response);
    }), err => console.log(err);
}


get newsP() {
  return this.createForm.controls;
}

get editsP() {
  return this.editForm.controls;
}

get newsC() {
  return this.catForm.controls;
}


onCreate() {
  if(this.newsP.cena.value<10 || this.newsP.dostupnost.value<0) {
    alert("Nevalidni podaci.");
      this.createLoad = false;
      return;
  }
      this.subC = true;
      this.createLoad = true;
      if(this.createForm.invalid) {
        alert("Nevalidna forma.");
        this.createLoad = false;
        return;
      }
  let product = new Product(0, this.newsP.naziv.value, Number(this.newsP.dostupnost.value), Number(this.newsP.cena.value),  Number(this.newsP.IdDobavljaca.value));
    console.log(product);

    this.ps.createProduct(product).subscribe(response => {alert(JSON.stringify("Proizvod dodat!"))
    console.log(response)
    this.getProducts();
  }, err => console.log(err)
    );
    this.createLoad=false;
}


onUpdate() {
  if(this.editsP.cenaE.value<10 || this.editsP.dostupnostE.value<0) {
    alert("Nevalidni podaci.");
      this.createLoad = false;
      return;
  }
  this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let product = new Product(this.editsP.IdProizvoda.value, this.editsP.nazivE.value, Number(this.editsP.dostupnostE.value), Number(this.editsP.cenaE.value),Number(this.editsP.IdDobavljacaE.value));

    this.ps.updateProduct(product).subscribe(response => {alert(JSON.stringify("Proizvod izmenjen!"))
    console.log(response)
    this.getProducts();
  }, err => console.log(err)
    );
    this.editLoad=false;
}
}
