import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { Kuponi } from '../models/kuponi';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-kuponi',
  templateUrl: './kuponi.component.html',
  styleUrls: ['./kuponi.component.css']
})
export class KuponiComponent implements OnInit {

  kuponi: Kuponi[]=[];
  selectedKupon: Kuponi=null;
  subC=false;
  subE=false;
  createForm: FormGroup;
  editForm: FormGroup;
  editLoad: boolean = false;
  createLoad: boolean=false;
  random=null;
  choices = [
    {value: 1, ind:'DA'}, {value: 0, ind:'NE'}
  ]

  

  constructor(private admn: AdminService, private fb: FormBuilder, protected router: Router, private us: UserService) { }

  ngOnInit(): void {
    if(!this.us.checkAdmin()) {
      this.router.navigate(['/']);
    }
    this.initCreateForm();
    this.initEditForm();
    this.getCoupons();
    this.random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  }

  
getCoupons() {
  this.admn.getCoupons().subscribe(kuponi => this.kuponi = kuponi);
}


initCreateForm() {
  this.createForm = this.fb.group({
    kod_kupona:Math.floor(Math.random() * (999 - 100 + 1)) + 100,
    stanje: [1, Validators.required],
    validan: ['', Validators.required],
    popust: [1, Validators.required]
  })
}

initEditForm() {
this.editForm = this.fb.group({
  kod_kuponaE: ['',Validators.required],
  stanjeE: [1, Validators.required],
  Evalidan: ['', Validators.required],
  popustE: [1, Validators.required]
})
}

get news() {
return this.createForm.controls;
}

get edits() {
return this.editForm.controls;
}

selectCoupon(coupon: Kuponi) {
this.selectedKupon = coupon;
this.editForm.patchValue({
  kod_kuponaE: this.selectedKupon.kod_kupona,
  stanjeE: this.selectedKupon.stanje,
  Evalidan: Boolean(this.selectedKupon.validan),
  popustE: this.selectedKupon.popust
})
}

onCreate() {

// if(Number(this.news.stanje.value)<500 || Number(this.news.popust.value)<5) {
//   alert("Nevalidni podaci.");
//   this.createLoad = false;
//   return;
// }
this.subC = true;
  this.createLoad = true;
  if(this.createForm.invalid) {
    alert("Nevalidna forma.");
    this.createLoad = false;
    return;
  }
  let coupon =  new Kuponi(Math.floor(Math.random() * (999 - 100 + 1)) + 100,this.news.stanje.value,Number(this.news.validan.value),this.news.popust.value);
  this.admn.createCoupon(coupon).subscribe(response => {alert(JSON.stringify("Novi kupon dodat!"))
  console.log(response)
  this.getCoupons();
}, err => console.log(err)
  );
  this.createLoad=false;
}

onUpdate() {
if(Number(this.edits.stanjeE.value)<1000 || Number(this.edits.popustE.value)<5) {
  alert("Nevalidni podaci.");
  this.createLoad = false;
  return;
}

if(this.editForm.invalid) {
  alert("Nevalidna forma.");
  this.editLoad = false;
  return;
}
  this.editLoad = true;
  this.subE = true;
  let coupon =  new Kuponi(this.edits.kod_kuponaE.value,this.edits.stanjeE.value,Number(this.edits.Evalidan.value),this.edits.popustE.value);
  this.admn.updateCoupon(coupon).subscribe(response => {alert(JSON.stringify("Kupon izmenjen!"))
  console.log(response)
  this.getCoupons();
}, err => console.log(err)
  );
  this.editLoad=false;
}

deleteSelected(id: number) {
this.admn.deleteCoupon(id).subscribe(
  response => {
    this.getCoupons();
    alert("Kupon obrisan!");
    console.log(response);
  }), err => console.log(err);
}

 randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
