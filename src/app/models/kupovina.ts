export class Kupovina{
    idArtikla: number;
    idDobavljaca: number;
    naziv:string;
    nazivP: string;
    cena: number;

    constructor(idArtikla:number, idDobavljaca:number, naziv: string, nazivP:string, cena:number){
        this.idArtikla=idArtikla;
        this.idDobavljaca=idDobavljaca;
        this.naziv=naziv;
        this.nazivP=nazivP;
        this.cena=cena;
    }
}