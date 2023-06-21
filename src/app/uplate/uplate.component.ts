import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { UslugeService } from '../services/usluge.service';

@Component({
  selector: 'app-uplate',
  templateUrl: './uplate.component.html',
  styleUrls: ['./uplate.component.css']
})
export class UplateComponent implements OnInit {

  porudzbina: Order;
  porudzbine:Order[]=[];
  constructor(private us:UslugeService, protected router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getPorudzbine();
  }

  getPorudzbine(){
    this.us.getPorudzbine().subscribe((por:Order[])=>{
      this.porudzbine=por;
    })
  }

  potvrdiUplatu(porudzbina:Order){
    this.us.potvrdiUplatu(porudzbina).subscribe((por:Order)=>{alert(JSON.stringify("Uplata izvrsena!"))
    console.log(por) 
    this.getPorudzbine();
  });
  }
}
