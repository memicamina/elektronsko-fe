export class Order {
    IdPorudzbine: number;
    datumP: string;
    ukupnaCena: number;
    email: string;
    uplaceno:string;

    constructor(IdPorudzbine: number, datumP:string, ukupnaCena:number,email:string,uplaceno:string) {
        this.IdPorudzbine = IdPorudzbine;
        this.datumP=datumP;
        this.ukupnaCena=ukupnaCena;
        this.email=email;
        this.uplaceno=uplaceno;
        
    }
}
