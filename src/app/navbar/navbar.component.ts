import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.services';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faCart = faShoppingCart;

  constructor(protected router:Router,private cartService: CartService, private userService: UserService) { }

  
  ngOnInit(): void {
  }
  
  getCount() {
    return this.cartService.getItemsCount();
  }
  getAuth() {
    return this.userService.checkAuth();
  }

  // getAuthF() {
  //   return this.userService.checkAuthF();
  // }

  isAdmin() {
    return this.userService.checkAdmin();
  }

  isMusterija(){
    return this.userService.checkMusterija();
  }

  isFriseur(){
    return this.userService.checkFrizer();
  }
  
  // isOsoblje() {
  //   return this.userService.checkOsoblje();
  // }

  logoutAdmin() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
