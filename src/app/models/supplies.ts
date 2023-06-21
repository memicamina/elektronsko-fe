import { Observable } from "rxjs";

export class Supplies {
    Id: number;
    IdDobavljaca: number;
    imeDobavljaca: string;
    naziv: string;
    kolicina: number;
    datum: string;
    cena: number;


    constructor(Id:number,IdDobavljaca:number, imeDobavljaca: string,naziv:string,kolicina:number, datum:string, cena:number) {
        this.Id = Id;
        this.IdDobavljaca =IdDobavljaca;
        this.imeDobavljaca = imeDobavljaca;
        this.naziv=naziv;
        this.kolicina=kolicina;
        this.datum = datum;
        this.cena = cena;
    }
}