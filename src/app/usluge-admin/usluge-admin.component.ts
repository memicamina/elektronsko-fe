import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usluge } from '../models/usluge';
import { UslugeService } from '../services/usluge.service';

@Component({
  selector: 'app-usluge-admin',
  templateUrl: './usluge-admin.component.html',
  styleUrls: ['./usluge-admin.component.css']
})
export class UslugeAdminComponent implements OnInit {

  constructor(private us: UslugeService,protected router: Router, private fb: FormBuilder) { }

  usluga: Usluge;
  usluge:Usluge[]=[];

  
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  catForm: FormGroup;
  editLoad: boolean = false;
  createLoad:boolean = false;
  catLoad = false;
  subCA = false;
  selectedOne: Usluge = null;

  ngOnInit(): void {
    this.initCreateForm();
    this.initEditForm();
    this.getUsluge();
   
  }

  getUsluge() {
    this.us.getUsluge().subscribe((usl: Usluge[]) => {
      this.usluge = usl})
  }

  
initCreateForm() {
  this.createForm = this.fb.group({
     vrsta: ['', Validators.required],
     cena: ['', Validators.required]
  })
}



initEditForm() {
  this.editForm = this.fb.group({
    idUsluge: ['', Validators.required],
    vrstaE: ['', Validators.required],
    cenaE: ['', Validators.required]
  })
}


selectOne(usluga: Usluge) {
  this.selectedOne = usluga;
  this.editForm.patchValue({
    idUsluge: this.selectedOne.idUsluge,
    vrstaE: this.selectedOne.vrsta,
    cenaE: this.selectedOne.cena
  })
}


deleteOne(id: number) {
  this.us.deleteUsluga(id).subscribe(
    response => {
      this.getUsluge();
      alert("Usluga je izbrisana!");
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
  if(this.newsP.cena.value<10) {
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
  let uslu = new Usluge(0, this.newsP.vrsta.value, Number(this.newsP.cena.value));
    console.log(uslu);

    this.us.createUslugu(uslu).subscribe(response => {alert(JSON.stringify("Usluga dodata!"))
    console.log(response)
    this.getUsluge();
  }, err => console.log(err)
    );
    this.createLoad=false;
}



onUpdate() {
  if(this.editsP.cenaE.value<10) {
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
    let uslu = new Usluge(this.editsP.idUsluge.value, this.editsP.vrstaE.value, Number(this.editsP.cenaE.value));

    this.us.updateUslugu(uslu).subscribe(response => {alert(JSON.stringify("Usluga izmenjena!"))
    console.log(response)
    this.getUsluge();
  }, err => console.log(err)
    );
    this.editLoad=false;
}
}
