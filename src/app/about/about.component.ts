import { Component, OnInit } from '@angular/core';
import { kuponiURL } from '../config/api';
import { Kuponi } from '../models/kuponi';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  kuponi: Kuponi[]=[];
  constructor(private adm: AdminService) { }

  ngOnInit(): void {
    this.getKuponi();
  }
getKuponi(){
  this.adm.getCoupons().subscribe(kuponi=>this.kuponi=kuponi.filter(c=>c.validan==1))
}
}
