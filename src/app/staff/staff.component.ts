import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { zahtevURL } from '../config/api';
import { Zahtev } from '../models/zahtev';
import { UslugeService } from '../services/usluge.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  currentTutorial = null;

  constructor(private us:UslugeService, protected router: Router, private fb:FormBuilder) { }

  zahtev: Zahtev;
  zahtevi: Zahtev[]=[];

  ngOnInit(): void {
    this.getZahtevi();
  }

  
  
  getZahtevi() {
    this.us.getZahtevi().subscribe((zah: Zahtev[]) => {
      this.zahtevi = zah})
  }


    odobriZahtev(zahtev: Zahtev){
    this.us.odobriZahtev(zahtev).subscribe((zah: Zahtev) => { alert(JSON.stringify("Zahtev odobren!"))
      console.log(zah) 
      this.getZahtevi();
    });
  }

  izbrisiZahtev(zahtev: Zahtev){
    this.us.izbrisiZahtev(zahtev).subscribe((zah: Zahtev) => {alert(JSON.stringify("Zahtev odbijen!"))
      console.log(zah) 
      this.getZahtevi();
    });
  }
}
