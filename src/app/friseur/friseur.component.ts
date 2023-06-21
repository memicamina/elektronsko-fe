import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Friseur } from '../models/friseur';
import { User } from '../models/user';
import { FriseurService } from '../services/friseur.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friseur',
  templateUrl: './friseur.component.html',
  styleUrls: ['./friseur.component.css']
})
export class FriseurComponent implements OnInit {

  friseur: Friseur;
  friseurs: Friseur[]=[];

  
  subC =  false;
  subE = false;
  createForm: FormGroup;
  editForm: FormGroup;
  catForm: FormGroup;
  hideR = true;
  hideL = true;
  fHide = true;
  editLoad: boolean = false;
  createLoad:boolean = false;
  catLoad = false;
  subCA = false;
  selectedOne: Friseur = null;
  newUser: User = null;
  constructor(private fs:FriseurService, protected router: Router,private fb: FormBuilder, private us:UserService) { }

  ngOnInit(): void {
    this.initCreateForm();
    this.initEditForm();
    this.getFriseurs();
  }

  getFriseurs() {
    this.fs.getFriseur().subscribe((fri: Friseur[]) => {
      this.friseurs = fri})
  }

  
initCreateForm() {
  this.createForm = this.fb.group({
     email: ['', Validators.required],
     lozinka: ['', Validators.required],
     ime: ['', Validators.required],
     prezime: ['', Validators.required],
     telefon: ['', Validators.required],
     plata: ['', Validators.required],
     staz: ['', Validators.required]
  })
}


initEditForm() {
  this.editForm = this.fb.group({
    idFrizera: ['', Validators.required],
    emailE: ['', Validators.required],
    imeE: ['', Validators.required],
    prezimeE: ['', Validators.required],
    telefonE: ['', Validators.required],
    plataE: ['', Validators.required],
    stazE: ['', Validators.required]
  })
}



selectOne(friseur: Friseur) {
  this.selectedOne = friseur;
  this.editForm.patchValue({
    idFrizera: this.selectedOne.idFrizera,
    emailE: this.selectedOne.email,
    imeE: this.selectedOne.ime,
    prezimeE: this.selectedOne.prezime,
    telefonE: this.selectedOne.telefon,
    plataE: this.selectedOne.plata,
    stazE: this.selectedOne.staz,
  })
}


deleteOne(id: number) {
  this.fs.deleteFriseur(id).subscribe(
    response => {
      this.getFriseurs();
      alert("Frizer je obrisan!");
      console.log(response);
    }), err => console.log(err);
}


toggleR() {
  this.hideR = !this.hideR;
}

toggleL() {
  this.hideL = !this.hideL;
}

toggleF() {
  this.fHide = !this.fHide;
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
  if(this.newsP.plata.value<10 || this.newsP.staz.value<0) {
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
      this.newUser = new User(this.newsP.ime.value,this.newsP.prezime.value,this.newsP.email.value,this.newsP.lozinka.value ,'0',this.newsP.telefon.value,2);
      console.log(this.newUser);
      this.us.register(this.newUser).subscribe(response => {alert(JSON.stringify("Korisnik dodat!"))
      console.log(response)
      this.getFriseurs();
    }, err => console.log(err)
      );

    let friseur = new Friseur(0, this.newsP.email.value,this.newsP.ime.value, this.newsP.prezime.value,  Number(this.newsP.telefon.value),Number(this.newsP.plata.value), Number(this.newsP.staz.value));
    console.log(friseur);
    this.fs.createFriseur(friseur).subscribe(response => {alert(JSON.stringify("Frizer dodat!"))
    console.log(response)
    this.getFriseurs();
  }, err => console.log(err)
    );
    this.createLoad=false;
}


onUpdate() {
  if(this.editsP.plataE.value<10 || this.editsP.stazE.value<0) {
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
    let friseur = new Friseur(this.editsP.idFrizera.value, this.editsP.emailE.value, this.editsP.imeE.value, this.editsP.prezimeE.value, Number(this.editsP.telefonE.value), Number(this.editsP.plataE.value),Number(this.editsP.stazE.value));

    this.fs.updateFriseur(friseur).subscribe(response => {alert(JSON.stringify("Frizer izmenjen!"))
    console.log(response)
    this.getFriseurs();
  }, err => console.log(err)
    );
    this.editLoad=false;
}
}
