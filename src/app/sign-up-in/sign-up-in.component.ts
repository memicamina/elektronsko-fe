import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Customer } from '../models/customer';
@Component({
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  styleUrls: ['./sign-up-in.component.css'],
})
export class SignUpInComponent implements OnInit {
  eye = faEye;
  rHidden = true;
  eyeS = faEyeSlash;
  hideR = true;
  hideL = true;
  fHide = true;

  signupForm: FormGroup;
  loginForm: FormGroup;

  submitted = false;
  loginTry = false;
  loading = false;
  loginLoad = false;
  newUser: User = null;
  oldCustomer: Customer = null;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.createSignupForm();
    this.createLoginForm();
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

  getAuth() {
    return this.us.checkAuth();
  }

  get scs() {
    return this.signupForm.controls;
  }

  get logInfo() {
    return this.loginForm.controls;
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', Validators.required],
      lozinka: ['', Validators.required],
      adresa: ['', Validators.required],
      telefon: ['', Validators.required],
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      emailU: ['', Validators.required],
      lozinkaU: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.newUser = new User(
      this.scs.ime.value,
      this.scs.prezime.value,
      this.scs.email.value,
      this.scs.lozinka.value,
      this.scs.adresa.value,
      this.scs.telefon.value,
      0
    );
    this.us.register(this.newUser).subscribe(
      (user: User) => {
        console.log(JSON.stringify(user));
        let auth = {
          email: user.email,
          admin: user.admin,
        };
        //  let token = CryptoJS.AES.encrypt(auth.email,'2608981412').toString();
        // let codeA = auth.admin;

        //  console.log(token);
        // let authToken = CryptoJS.AES.decrypt(token,'2608981412').toString(CryptoJS.enc.Utf8);
        //console.log(authToken);
        sessionStorage.setItem('user', auth.email);
        sessionStorage.setItem('codeA', JSON.stringify(auth.admin));
        this.router.navigate(['/']);
      },
      (err) => console.log(JSON.stringify(err))
    );
    this.loading = false;
  }
  refresh(): void {
    window.location.reload();
  }

  onLogin() {
    this.loginTry = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginLoad = true;
    this.oldCustomer = new Customer(
      this.logInfo.emailU.value,
      this.logInfo.lozinkaU.value
    );
    this.us.login(this.oldCustomer).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        sessionStorage.setItem('user', data.email);
        sessionStorage.setItem('codeA', JSON.stringify(data.admin));
        //sessionStorage.setItem('admin',JSON.stringify(data.admin))
        this.router.navigate(['/about']);
      },
      (err) => console.log(JSON.stringify(err))
    );
    this.loginLoad = false;
  }
}
