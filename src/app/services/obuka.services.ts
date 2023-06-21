import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { MessageService } from './message.service';
import {of} from 'rxjs'
import {catchError,tap} from 'rxjs/operators'
import { Obuka } from '../models/obuka';
import { izbrisi_kursURL, kursURL, mojiZahtevi_obukaURL, noviZahtev_obukaURL, novi_kursURL, odbijZahtev_obukaURL, odobriZahtev_obukaURL, Zahtev_obukaURL } from '../config/api';
import { ZahtevObuka } from '../models/zahtevObuka';


@Injectable({
  providedIn: 'root'
})
export class ObukaService{

  constructor(private http: HttpClient, private msg: MessageService) { }


  getObuku() : Observable<Obuka[]> {
    return this.http.get<Obuka[]>(kursURL).pipe(
      tap(_=> this.log('fetched obuka')),
      catchError(this.handleError<Obuka[]>('getObuku',[]))
    );
  }



createObuku(obuka: Obuka): Observable<Obuka> {
  return this.http.post<Obuka>(novi_kursURL,JSON.stringify(obuka)).pipe(
   tap(_=> this.log('Novi kurs je dodat!')),
     catchError(this.handleErrorTwo))
}


deleteObuka(IdKursa: number) {
    return this.http.get<Obuka>(`${izbrisi_kursURL}?id=${IdKursa}`).pipe(
      tap(_=> this.log('Obuka izbrisana!')),
        catchError(this.handleErrorTwo))
  }

  
createZahtev(zahtev: ZahtevObuka): Observable<ZahtevObuka> {
  return this.http.post<ZahtevObuka>(noviZahtev_obukaURL,JSON.stringify(zahtev)).pipe(
   tap(_=> this.log('Zahtev dodat!')),
     catchError(this.handleErrorTwo))
}
 

getZahteviObuka() : Observable<ZahtevObuka[]> {
  return this.http.get<ZahtevObuka[]>(Zahtev_obukaURL).pipe(
    tap(_=> this.log('fetched products')),
    catchError(this.handleError<ZahtevObuka[]>('getZahteviObuka',[]))
  );
}
 


odobriZahtev(zahtev: ZahtevObuka) {
  return this.http.post<ZahtevObuka>(odobriZahtev_obukaURL,JSON.stringify(zahtev)).pipe(
    tap(_=> this.log('Zahtev odobren!')),
      catchError(this.handleErrorTwo))
}



izbrisiZahtev(zahtev: ZahtevObuka) {
  return this.http.post<ZahtevObuka>(odbijZahtev_obukaURL,JSON.stringify(zahtev)).pipe(
    tap(_=> this.log('Zahtev odobren!')),
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
