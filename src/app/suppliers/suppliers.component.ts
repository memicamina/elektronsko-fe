import { Component, OnInit } from '@angular/core';
import { Suppliers } from '../models/supplier';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Suppliers[] = [];
  selectedSupplier: Suppliers = null;
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;

  constructor(private fb: FormBuilder, protected router: Router, private admn: AdminService) { }

  ngOnInit(): void {
    this.getSuppliers();
    this.initCreateForm();
    this.initEditForm();
  }
  
  getSuppliers() {
    this.admn.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
  }

  initCreateForm() {
    this.createForm = this.fb.group({
      naziv: ['',Validators.required],
      lokacija: ['', Validators.required]
    })
}

initEditForm() {
  this.editForm = this.fb.group({
    IdDobavljacaE: ['', Validators.required],
    nazivE: ['',Validators.required],
    lokacijaE: ['', Validators.required],
  })
}

get news() {
  return this.createForm.controls;
}
get edtis() {
  return this.editForm.controls;
}

onCreate() {
  this.subC = true;
  this.createLoad = true;
  if(this.createForm.invalid) {
    alert("Nevalidna forma.");
    this.createLoad = false;
    return;
  }
  let supplier = new Suppliers(0,this.news.naziv.value, this.news.lokacija.value);
  this.admn.createSupplier(supplier).subscribe(response => {alert(JSON.stringify("Novi snabdevač dodat!"))
  console.log(response)
  this.getSuppliers();
}, err => console.log(err)
  );
  this.createLoad=false;
}

onUpdate() {
  if(this.editForm.invalid) {
    alert("Nevalidna forma.");
    this.editLoad = false;
    return;
  }
  this.editLoad=true;
  this.subE=true;
  let supplier = new Suppliers(this.edtis.IdDobavljacaE.value, this.edtis.nazivE.value, this.edtis.lokacijaE.value);
  this.admn.updateSupplier(supplier).subscribe(response => {
    this.getSuppliers();
    alert("Snabdevač izmenjen!");
    console.log(response);
  }), err => console.log(err);
  console.log(supplier);
  this.editLoad=false;
}

selectSupplier(supplier: Suppliers) {
  this.selectedSupplier = supplier;
  this.editForm.patchValue({
    IdDobavljacaE: this.selectedSupplier.IdDobavljaca,
    nazivE: this.selectedSupplier.naziv,
    lokacijaE: this.selectedSupplier.lokacija,
  })
}
deleteSelected(id: number) {
  this.admn.deleteSupplier(id).subscribe(response => {
    this.getSuppliers();
    alert("Snabdevač obrisan!");
    console.log(response);
  }), err => console.log(err);
}


}
