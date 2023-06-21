export class Friseur {
    idFrizera: number;
    email: string;
    ime: string;
    prezime: string;
    telefon: number;
    plata: number;
    staz:number;

    constructor(idFrizera:number,email:string,ime:string,prezime:string,telefon:number,plata:number, staz:number) {
        this.idFrizera =idFrizera;
        this.email=email;
        this.ime=ime;
        this.prezime=prezime;
        this.telefon=telefon;
        this.plata = plata;
        this.staz=staz;
    }
}
