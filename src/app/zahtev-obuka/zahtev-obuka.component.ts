import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Obuka } from '../models/obuka';
import { User } from '../models/user';
import { ZahtevObuka } from '../models/zahtevObuka';
import { ObukaService } from '../services/obuka.services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-zahtev-obuka',
  templateUrl: './zahtev-obuka.component.html',
  styleUrls: ['./zahtev-obuka.component.css']
})
export class ZahtevObukaComponent implements OnInit {

  obuka:Obuka;
  obuke:Obuka[]=[];
  today: string;
  myForm:FormGroup;
    editForm: FormGroup;
    selectedOne: Obuka = null;
    editLoad: boolean = false;
  
    user: User = null;
    zahtevObuka:ZahtevObuka;
    zahteviZaObuke:ZahtevObuka[]=[];
    subE = false;
    model;
    


  constructor(private os:ObukaService,private userService:UserService,protected router:Router,private fb:FormBuilder) { }
  

  ngOnInit(): void {
    this.getObuke();
    this.initEditForm();
  }

  getObuke(){
    this.os.getObuku().subscribe((obu:Obuka[])=>{
      this.obuke=obu;
    })
  }

  
  getZahtevi() {
    this.os.getZahteviObuka().subscribe((zah: ZahtevObuka[]) => {
      this.zahteviZaObuke = zah})
  }
  
  
  setValues(e: string) {
    this.myForm.patchValue({
       email:e
    })
  }

  
initEditForm() {
  this.editForm = this.fb.group({
    idKursaE: ['', Validators.required],
    email: ['', Validators.required]
  })
}


selectOne(obuka: Obuka) {
  this.selectedOne = obuka;
  this.editForm.patchValue({
    idKursaE: this.selectedOne.IdKursa  
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
    let zahtevO = new ZahtevObuka(0, this.editsP.idKursaE.value,this.editsP.email.value,'cekanje');
    this.os.createZahtev(zahtevO).subscribe(response => {alert(JSON.stringify("Zahtev poslat!"))
    console.log(response)
  }, err => console.log(err)
    );
    this.editLoad=false;

}

}
