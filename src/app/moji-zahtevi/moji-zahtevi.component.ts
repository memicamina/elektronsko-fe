import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Zahtev } from '../models/zahtev';
import { UserService } from '../services/user.service';
import { UslugeService } from '../services/usluge.service';

@Component({
  selector: 'app-moji-zahtevi',
  templateUrl: './moji-zahtevi.component.html',
  styleUrls: ['./moji-zahtevi.component.css']
})
export class MojiZahteviComponent implements OnInit {

  constructor(private us:UslugeService,private userService:UserService, protected router: Router, private fb:FormBuilder) { }
  user: User = null;
  zahtev: Zahtev;
  zahtevi: Zahtev[]=[];


  
  numOfOrders = 5;
  myForm: FormGroup;
  hiddens = [];
  
  myLoad = false;
  mySub = false;
  

  ngOnInit(): void {
    if(!this.userService.checkAuth()) {
      this.router.navigate(['/']);
    }
    this.initForm();
    this.getMe();
    this.getMojeZahteve();
  }

  
  
  initForm() {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      adresa:['', Validators.required],
      telefon: ['', Validators.required]
    })
  }

  
  setValues(e: string, i:string, p: string,a:string,t:number) {
    this.myForm.patchValue({
       email:e,
       ime:i,
       prezime:p,
       adresa:a,
       telefon: t,
    })
  }
  getZahtevi() {
    this.us.getOdobreneZahteve().subscribe((zah: Zahtev[]) => {
      this.zahtevi = zah})
  }

  
  getMojeZahteve(){
    let token = sessionStorage.getItem('user');
    this.userService.getZahteviMusterije(token).subscribe((zah: Zahtev[])=>{
      this.zahtevi=zah
    })
  }

  getMe() {
    let token = sessionStorage.getItem('user');
   // let me = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
    this.userService.getMe(token).subscribe(user => {console.log(JSON.stringify(user)); 
       this.user = user;
    this.setValues(user.email,user.ime,user.prezime,user.adresa,Number(user.telefon));
    },err => {
      console.log(err);
      this.router.navigate(['/']);
    })
  }

  
  toggleHidden(id) {
    let current = !this.hiddens.find(o => o.order == id).hidden;
    this.hiddens.find(o => o.order == id).hidden = current;
 }

 
 getHidden(id: number) {
  return this.hiddens.find(o => o.order == id).hidden;
}

getTotal(id: number) {
 return this.hiddens.find(o => o.order == id).total;
}
getDateTime(id: number) {
 return this.hiddens.find(o => o.order == id).dateT;
}


onUpdate() {
  this.mySub = true;
  this.myLoad = true;
  if(this.myForm.invalid) {
    alert("Nevalidna forma.");
      this.myLoad = false;
      return;
  }
  let data = {
    email: this.user.email,
    ime: this.edits.ime.value,
    prezime: this.edits.prezime.value,
    adresa:this.edits.adresa.value,
    telefon: this.edits.telefon.value
  }
  console.log(data);
  this.userService.editMe(data).subscribe(res => {
    console.log(res);
    this.getMe();
    alert(res);
  }), err => { alert("Izmene nisu uspele.");
  console.log(err);
}
this.myLoad=false;
}



get edits() {
  return this.myForm.controls;
}

}
