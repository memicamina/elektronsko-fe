import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Suppliers } from '../models/supplier';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {productURL, productIdURL, suppliersURL, newProductURL, updateProductURL, deleteProductURL, kuponiURL, kupovinaURL} from 'src/app/config/api'
import {catchError,tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {MessageService} from 'src/app/services/message.service'
import { map } from 'rxjs/operators';
import { Kupovina } from '../models/kupovina';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,private msg: MessageService) { }

  
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(productURL).pipe(
      tap(_=> this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts',[]))
    );
  }

  
  getKupovina() : Observable<Kupovina[]> {
    return this.http.get<Kupovina[]>(kupovinaURL).pipe(
      tap(_=> this.log('fetched products')),
      catchError(this.handleError<Kupovina[]>('getKupovina',[]))
    );
  }

  getById(id: number) : Observable<Product> {
    return this.http.get<Product>(`${productIdURL}?id=${id}`).pipe(
      tap(_=> this.log('fetched product')),
      catchError(this.handleErrorTwo)
    );
  }

  
getSuppliers(): Observable<Suppliers[]> {
  return this.http.get<Suppliers[]>(suppliersURL).pipe(
    tap(_=> this.log('fetched suppliers')),
    catchError(this.handleError<Suppliers[]>('getSuppliers',[]))
  );
}


createProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(newProductURL,JSON.stringify(product)).pipe(
   tap(_=> this.log('Product added!')),
     catchError(this.handleErrorTwo))
}


updateProduct(product: Product) {
  return this.http.post<Product>(updateProductURL,JSON.stringify(product)).pipe(
    tap(_=> this.log('Product updated!')),
      catchError(this.handleErrorTwo))
}

deleteProduct(IdProizvoda: number) {
  return this.http.get<Product>(`${deleteProductURL}?id=${IdProizvoda}`).pipe(
    tap(_=> this.log('Product deleted!')),
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
