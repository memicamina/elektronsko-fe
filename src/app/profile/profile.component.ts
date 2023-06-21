import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Obuka } from '../models/obuka';
import { User } from '../models/user';
import { zahteviFrizera } from '../models/zahteviFrizera';
import { ZahtevObuka } from '../models/zahtevObuka';
import { ObukaService } from '../services/obuka.services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  numOfOrders = 5;
  myForm: FormGroup;
  hiddens = [];
  user: User = null;

  obuke:Obuka[]=[];
  zahtevi:ZahtevObuka[]=[];
  zahtevFrizer:zahteviFrizera[]=[];
  myLoad = false;
  mySub = false;
  

  constructor(private userService:UserService,private obuka:ObukaService,protected router:Router, private fb:FormBuilder) { }

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

  
  getZahtevi(){
    this.obuka.getZahteviObuka().subscribe((zah: ZahtevObuka[])=>{
      this.zahtevi=zah
    })
  }

  getObuka(){
    this.obuka.getObuku().subscribe((ob:Obuka[])=>{
      this.obuke=ob;
    })
  }

  getMojeZahteve(){
    let token = sessionStorage.getItem('user');
    this.userService.getMyZahtev(token).subscribe((zah: zahteviFrizera[])=>{
      this.zahtevFrizer=zah
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
