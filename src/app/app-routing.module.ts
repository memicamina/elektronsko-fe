import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpInComponent} from './sign-up-in/sign-up-in.component';
import { AboutComponent } from './about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MycartComponent } from './mycart/mycart.component';
import { CartColumnsComponent } from './cart-columns/cart-columns.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { StaffComponent } from './staff/staff.component';
import { FriseurComponent } from './friseur/friseur.component';
import { ProductComponent } from './product/product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { UslugaComponent } from './usluga/usluga.component';
import { UslugeAdminComponent } from './usluge-admin/usluge-admin.component';
import { MojiZahteviComponent } from './moji-zahtevi/moji-zahtevi.component';
import { KuponiComponent } from './kuponi/kuponi.component';
import { UplateComponent } from './uplate/uplate.component';
import { ObukaComponent } from './obuka/obuka.component';
import { ZahtevObukaComponent } from './zahtev-obuka/zahtev-obuka.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { KupovinaComponent } from './kupovina/kupovina.component';
import { KorpaAdminComponent } from './korpa-admin/korpa-admin.component';

const routes: Routes = [
    {path: 'sign-up-in', component: SignUpInComponent},
    {path: 'about', component: AboutComponent},
    {path: '', redirectTo: '/about', pathMatch: 'full'},
    {path: 'product-list', component: ProductListComponent},
    {path: 'mycart', component: MycartComponent},
    {path: 'cart-columns', component: CartColumnsComponent},
    {path: 'suppliers', component: SuppliersComponent},
    {path: 'supplies', component: SuppliesComponent},
    {path: 'staff', component: StaffComponent},
    {path: 'friseur', component: FriseurComponent},
    {path: 'product', component: ProductComponent},
    {path: 'usluga', component: UslugaComponent},
    {path: 'uslugeAdmin', component:UslugeAdminComponent},
    {path: 'mojiZahtevi', component:MojiZahteviComponent},
    {path: 'kuponi', component:KuponiComponent},
    {path: 'uplata', component:UplateComponent},
    {path: 'obuka', component:ObukaComponent},
    {path: 'zahtevObuka', component:ZahtevObukaComponent},
    {path: 'profil', component:ProfileComponent},
    {path: 'admin-zahtevi', component:AdminZahteviComponent},
    {path: 'kupovina', component:KupovinaComponent},
    {path: 'korpa-admin', component:KorpaAdminComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }