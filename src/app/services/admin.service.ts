import { Suppliers } from "../models/supplier";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {suppliersURL, newSupplierURL, updateSupplierURL, deleteSupplierURL, suppliesURL, newSupplyURL, updateSupplyURL, deleteSupplyURL, kuponiURL, novi_kuponiURL, izmeni_kuponURL, izbrisi_kuponURL, proizvodiDobavljacaURL, selectIdDobavljacaURL} from './../config/api';
import {of} from 'rxjs'
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {catchError,tap} from 'rxjs/operators';
import { Product } from '../models/product';
import {productURL, productIdURL} from 'src/app/config/api'
import {MessageService} from 'src/app/services/message.service'
import { map } from 'rxjs/operators';
import { Supplies } from "../models/supplies";
import { Kuponi } from "../models/kuponi";


@Injectable({
    providedIn: 'root'
  })
  export class AdminService {
  
    adminUsers: any[] = [];
  
    constructor(private http: HttpClient, private msg: MessageService) { 
    }

    
getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(suppliersURL).pipe(
      tap(_=> this.log('fetched suppliers')),
      catchError(this.handleError<Suppliers[]>('getSuppliers',[]))
    );
  }
  

  
  createSupplier(supplier: Suppliers):Observable<Suppliers> {
    return this.http.post<Suppliers>(newSupplierURL,JSON.stringify(supplier)).pipe(
      tap(_=> this.log('Supplier added!')),
        catchError(this.handleErrorTwo))
  }
  
  updateSupplier(supplier: Suppliers) {
    return this.http.post<Suppliers>(updateSupplierURL,JSON.stringify(supplier)).pipe(
      tap(_=> this.log('Supplier updated!')),
        catchError(this.handleErrorTwo));
  }
  
  deleteSupplier(IdDobavljaca: number):Observable<any>{
    return this.http.get<Suppliers>(`${deleteSupplierURL}?id=${IdDobavljaca}`).pipe(
      tap(_=> this.log('Supplier deleted!')),
        catchError(this.handleErrorTwo))
  }


  prikaziNaziv(IdDobavljaca: number):Observable<any>{
    return this.http.get<Suppliers>(`${proizvodiDobavljacaURL}?id=${IdDobavljaca}`).pipe(
      tap(_=> this.log('Supplier deleted!')),
        catchError(this.handleErrorTwo))
  }
getSupplies():Observable<Supplies[]> {
  return this.http.get<Supplies[]>(suppliesURL).pipe(
    tap(_=> this.log('fetched supplies')),
    catchError(this.handleError<Supplies[]>('getSupplies',[]))
  );
}

createSupply(supplies: Supplies): Observable<Supplies> {
  return this.http.post<Supplies>(newSupplyURL,JSON.stringify(supplies)).pipe(
    tap(_=> this.log('Supply added!')),
      catchError(this.handleErrorTwo))
}

getIdDobavljaca(ime:string): Observable<number> {
  return this.http.get<number>(`${selectIdDobavljacaURL}?naziv=${ime}`);
}

updateSupply(supply: Supplies) {
  return this.http.post<Supplies>(updateSupplyURL,JSON.stringify(supply)).pipe(
    tap(_=> this.log('Supply updated!')),
      catchError(this.handleErrorTwo))
}

deleteSupply(Id:number) {
  return this.http.get<Supplies>(`${deleteSupplyURL}?id=${Id}`).pipe(
    tap(_=> this.log('Supply deleted!')),
      catchError(this.handleErrorTwo))
}


getCoupons(): Observable<Kuponi[]> {
  return this.http.get<Kuponi[]>(kuponiURL).pipe(
    tap(_=> this.log('fetched coupons')),
    catchError(this.handleError<Kuponi[]>('getCoupnos',[]))
  );
}

createCoupon(coupon: Kuponi):Observable<Kuponi> {
  return this.http.post<Kuponi>(novi_kuponiURL,JSON.stringify(coupon)).pipe(
    tap(_=> this.log('Coupon added!')),
      catchError(this.handleErrorTwo))
}
updateCoupon(coupon: Kuponi){
  return this.http.post<Kuponi>(izmeni_kuponURL,JSON.stringify(coupon)).pipe(
    tap(_=> this.log('Coupon updated!')),
      catchError(this.handleErrorTwo))
}

deleteCoupon(id: number):Observable<any>{
  return this.http.get<Kuponi>(`${izbrisi_kuponURL}?id=${id}`).pipe(
    tap(_=> this.log('Coupon deleted!')),
      catchError(this.handleErrorTwo))
}


private log(message: string) {
    this.msg.add(`Product service: ${message}`);
  }

 private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
 
     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead
 
     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);
 
     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }

 handleErrorTwo(error: HttpErrorResponse) {
  console.log("Error! Somtehing went wrong.",error);
  alert(JSON.stringify(error.error))
  return throwError("Something went wrong");
 }

}