import { Injectable } from '@angular/core';
import { Friseur } from '../models/friseur';
import { MessageService } from './message.service';
import { Observable, throwError } from 'rxjs';
import {catchError,tap} from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { deleteFriseurURL, friseurURL, newFriseurURL, updateFriseurURL } from '../config/api';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FriseurService {

  constructor(private http: HttpClient, private msg: MessageService) { }

  
  getFriseur() : Observable<Friseur[]> {
    return this.http.get<Friseur[]>(friseurURL).pipe(
      tap(_=> this.log('fetched friseur')),
      catchError(this.handleError<Friseur[]>('getFriseurs',[]))
    );
  }

  
createFriseur(friseur: Friseur): Observable<Friseur> {
  return this.http.post<Friseur>(newFriseurURL,JSON.stringify(friseur)).pipe(
   tap(_=> this.log('Product added!')),
     catchError(this.handleErrorTwo))
}


updateFriseur(friseur: Friseur) {
  return this.http.post<Friseur>(updateFriseurURL,JSON.stringify(friseur)).pipe(
    tap(_=> this.log('Friseur updated!')),
      catchError(this.handleErrorTwo))
}

deleteFriseur(idFrizera: number) {
  return this.http.get<Friseur>(`${deleteFriseurURL}?id=${idFrizera}`).pipe(
    tap(_=> this.log('Friseur deleted!')),
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
