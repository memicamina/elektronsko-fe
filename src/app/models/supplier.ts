export class Suppliers {
    IdDobavljaca: number;
    naziv: string;
    lokacija: string;


    constructor(IdDobavljaca:number,naziv:string,lokacija:string) {
        this.IdDobavljaca =IdDobavljaca;
        this.naziv=naziv;
        this.lokacija=lokacija;
    }
}