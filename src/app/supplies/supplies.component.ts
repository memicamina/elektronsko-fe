import { Component, OnInit } from '@angular/core';
import { Supplies } from '../models/supplies';
import { Router } from '@angular/router';
import { Suppliers } from '../models/supplier';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  supplies: Supplies[] = [];
  suppliers: Suppliers[] = [];
  selectedSupply: Supplies = null;
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  today: string = (new Date().toISOString().slice(0,10));

  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router) { }

  ngOnInit(): void {
    this.getSuppliers();
    this.getSupplies();
    this.initCreateForm();
    this.initEditForm();
  }

  
getSupplies() {
  this.admn.getSupplies().subscribe(supplies => this.supplies=supplies);
}
getSuppliers() {
  this.admn.getSuppliers().subscribe(suppliers => this.suppliers=suppliers);
}


initCreateForm() {
  this.createForm = this.fb.group({
    //IdDobavljaca: ['', Validators.required],
    nazivD: ['',Validators.required],
    naziv: ['',Validators.required],
    kolicina: [1,Validators.required],
    datum: [this.today,Validators.required],
    cena: ['',Validators.required]
  })
}

initEditForm() {
this.editForm = this.fb.group({
    IdE: ['',Validators.required],
    IdDobavljacaE: ['',Validators.required],
    nazivE: ['', Validators.required],
    kolicinaE: ['',Validators.required],
    datumE: [1,Validators.required],
    cenaE: ['',Validators.required]
})
}

get news() {
  return this.createForm.controls;
}

get edtis() {
  return this.editForm.controls;
}

selectOne(s: Supplies) {
  this.selectedSupply = s;
  this.editForm.patchValue({
    IdE: this.selectedSupply.Id,
    IdDobavljacaE: this.selectedSupply.IdDobavljaca,
    nazivE: this.selectedSupply.naziv,
    kolicinaE: this.selectedSupply.kolicina,
    datumE: this.selectedSupply.datum,
    cenaE: this.selectedSupply.cena
  })
}
onCreate() {
  if(this.news.kolicina.value<1) {
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

      let supply = new Supplies(0,52,this.news.nazivD.value,this.news.naziv.value,this.news.kolicina.value,this.news.datum.value,this.news.cena.value);
      this.admn.createSupply(supply).subscribe(response => {alert(JSON.stringify("Novo snabdevanje dodato!"))
      console.log(response)
      this.getSupplies();
    }, err => console.log(err)
      );
      this.createLoad=false;
  }
  
deleteOne(Id:number) {
  this.admn.deleteSupply(Id).subscribe(
    response => {
      this.getSupplies();
      alert("Snabdevanje obrisano!");
      console.log(response);
    }), err => console.log(err);
}

onUpdate() {
  if(this.edtis.kolicinaE.value<1) {
    alert("Nevalidni podaci.");
      this.editLoad = false;
      return;
      }
      this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let supply = new Supplies(this.edtis.IdE.value,this.edtis.IdDobavljacaE.value,this.news.nazivD.value,this.edtis.nazivE.value,this.edtis.kolicinaE.value,this.edtis.datumE.value,this.edtis.cenaE.value);
    this.admn.updateSupply(supply).subscribe(response => {alert(JSON.stringify("Snabdevanje izmenjeno!"))
    console.log(response)
    this.getSupplies();
  }, err => console.log(err)
    );
    this.editLoad=false;
}
}
