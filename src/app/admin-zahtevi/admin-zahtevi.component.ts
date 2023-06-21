import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Obuka } from '../models/obuka';
import { ZahtevObuka } from '../models/zahtevObuka';
import { ObukaService } from '../services/obuka.services';

@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit {

  constructor(private os:ObukaService,protected router: Router, private fb:FormBuilder) { }

  zahtev:ZahtevObuka;
  zahtevi:ZahtevObuka[]=[];
  kurs:Obuka[]=[];
  
  ngOnInit(): void {
    this.getZahtevi();
  }

  getZahtevi(){
    this.os.getZahteviObuka().subscribe((zah: ZahtevObuka[])=>{
      this.zahtevi=zah
    })
  }

  getObuka(){
    this.os.getObuku().subscribe((ob:Obuka[])=>{
      this.kurs=ob;
    })
  }

  
  odobriZahtev(zahtev: ZahtevObuka){
    this.os.odobriZahtev(zahtev).subscribe((zah: ZahtevObuka) => { alert(JSON.stringify("Zahtev odobren!"))
      console.log(zah) 
      this.getZahtevi();
    });
  }

  izbrisiZahtev(zahtev: ZahtevObuka){
    this.os.izbrisiZahtev(zahtev).subscribe((zah: ZahtevObuka) => {alert(JSON.stringify("Zahtev odbijen!"))
      console.log(zah) 
      this.getZahtevi();
    });
  }
}
