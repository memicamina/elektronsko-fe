export class User {
    //idMusterije: number;
    ime: string;
    prezime: string;
    email: string;
    lozinka: string;
    adresa: string;
    telefon: string; 
    admin: number;

    constructor(ime:string, prezime:string,email:string,lozinka:string,adresa:string,telefon:string,admin:number) {
      // this.idMusterije = idMusterije;   
       this.ime=ime;
       this.prezime=prezime;
       this.email=email;
       this.lozinka=lozinka;
       this.adresa=adresa;
       this.telefon=telefon;
       this.admin = admin;
    }
}
