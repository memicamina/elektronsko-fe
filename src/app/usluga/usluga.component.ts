import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { odobriZahtevURL, zahtevURL } from '../config/api';
import { User } from '../models/user';
import { Usluge } from '../models/usluge';
import { Zahtev } from '../models/zahtev';
import { UserService } from '../services/user.service';
import { UslugeService } from '../services/usluge.service';

@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
export class UslugaComponent implements OnInit {

  usluga: Usluge;
  usluge: Usluge[]=[];
  today: string;
myForm:FormGroup;
  zahtev: Zahtev;
  zahtevi: Zahtev[]=[];
user: User=null;
  editForm: FormGroup;
  selectedOne: Usluge = null;
  editLoad: boolean = false;
  subE = false;
  model;

izabraniDatum: String = new Date().toDateString();
  title="addBootstrap";
  constructor(private us: UslugeService, private userS:UserService, protected router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsluge();
    this.initEditForm();
    this.today= new Date().toDateString();
   // this.danas = this.transform(this.myDate, 'yyyy-MM-dd');
  
  }

  getUsluge() {
    this.us.getUsluge().subscribe((usl: Usluge[]) => {
      this.usluge = usl})
  }

  
  getZahtevi() {
    this.us.getZahtevi().subscribe((zah: Zahtev[]) => {
      this.zahtevi = zah})
  }

  
  setValues(e: string) {
    this.myForm.patchValue({
       email:e
    })
  }
  getMe() {
    let token = sessionStorage.getItem('user');
    this.userS.getMe(token).subscribe(user => {console.log(JSON.stringify(user)); 
       this.user = user;
    this.setValues(user.email);
    },err => {
      console.log(err);
      this.router.navigate(['/']);
    })
  }

initEditForm() {
  this.editForm = this.fb.group({
    email: ['', Validators.required],
    idUslugeE: ['', Validators.required],
    vrstaE: ['', Validators.required],
    cenaE: ['', Validators.required],
    datumE:['',Validators.required],
    vremeE:['',Validators.required]
  })
}



selectOne(usluga: Usluge) {
  this.selectedOne = usluga;
  this.editForm.patchValue({
    idUslugeE: this.selectedOne.idUsluge,
    vrstaE: this.selectedOne.vrsta,
    cenaE: this.selectedOne.cena
  })
}


get editsP() {
  return this.editForm.controls;
}



onUpdate() {
  
  this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let product = new Zahtev(0, this.editsP.email.value,this.editsP.idUslugeE.value,this.editsP.vrstaE.value, this.editsP.datumE.value, this.editsP.vremeE.value,'cekanje');
    this.us.createZahtev(product).subscribe(response => {alert(JSON.stringify("Zahtev poslat!"))
    console.log(response)
    this.getZahtevi();
  }, err => console.log(err)
    );
    this.editLoad=false;

}

}
