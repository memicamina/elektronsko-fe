import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Obuka } from '../models/obuka';
import { ObukaService } from '../services/obuka.services';

@Component({
  selector: 'app-obuka',
  templateUrl: './obuka.component.html',
  styleUrls: ['./obuka.component.css']
})
export class ObukaComponent implements OnInit {

  
  obuka: Obuka;
  obuke: Obuka[]=[];
  today: string;
myForm:FormGroup;
  editForm: FormGroup;
  selectedOne: Obuka = null;
  editLoad: boolean = false;
prosao: boolean;
  subE = false;
  model;

  
izabraniDatum: String = new Date().toDateString();
title="addBootstrap";
  constructor(private os:ObukaService,protected router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getObuku();
    this.initEditForm();
    this.today= new Date().toDateString();
  }

  getObuku(){
    this.os.getObuku().subscribe((obu:Obuka[])=>{
      this.obuke=obu;
    })
  }

  
initEditForm() {
  this.editForm = this.fb.group({
    naziv:['', Validators.required],
    mentor: ['', Validators.required],
    datumE:['',Validators.required],
    vremeE:['',Validators.required],
    opisE:['', Validators.required],
  })
}


selectOne(obuka: Obuka) {
  this.selectedOne = obuka;
  this.editForm.patchValue({
    IdKursaE: this.selectedOne.IdKursa,
    mentor: this.selectedOne.mentor,
    datumE: this.selectedOne.datum,
    vremeE:this.selectedOne.vreme,
    opisE:this.selectedOne.opis
  })
}


get editsP() {
  return this.editForm.controls;
}




kreirajKurs() {
  
  this.subE = true;
      this.editLoad = true;
      if(this.editForm.invalid) {
        alert("Nevalidna forma.");
        this.editLoad = false;
        return;
      }
    let kurs = new Obuka(0,this.editsP.naziv.value, this.editsP.mentor.value,this.editsP.datumE.value, this.editsP.vremeE.value,this.editsP.opisE.value);
    this.os.createObuku(kurs).subscribe(response => {alert(JSON.stringify("Novi kurs dodat!"))
    console.log(response)
    this.getObuku();
  }, err => console.log(err)
    );
    this.editLoad=false;

}



deleteOne(id: number) {
  this.os.deleteObuka(id).subscribe(
    response => {
      this.getObuku();
      alert("Kurs je obrisan!");
      console.log(response);
    }), err => console.log(err);
}
}
