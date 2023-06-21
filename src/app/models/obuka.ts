export class Obuka {
    IdKursa: number;
    naziv:string;
    mentor: string;
    datum:string;
    vreme: string;
    opis: string;

    constructor(IdKursa:number,naziv:string,mentor:string,datum: string,vreme:string, opis:string) {
        this.IdKursa =IdKursa;
        this.naziv=naziv;
        this.mentor = mentor;
        this.datum = datum;
        this.vreme=vreme;
        this.opis=opis;
        
        }
}
