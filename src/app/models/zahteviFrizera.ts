export class zahteviFrizera {
    idZahteva: number;
    idKursa:number;
    status: string;
    naziv:string;
    datum:string;
    vreme:string;

    constructor(idZahteva:number,idKursa:number,status:string,naziv:string,datum:string,vreme:string) {
        this.idZahteva =idZahteva;
        this.idKursa=idKursa;
        this.status=status;
        this.naziv=naziv;
        this.datum=datum;
        this.vreme=vreme;
        }
}
