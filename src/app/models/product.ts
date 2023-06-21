export class Product {
    IdProizvoda: number;
    naziv: string;
    dostupnost: number;
    cena: number;
    IdDobavljaca: number;

    constructor(IdProizvoda:number,naziv:string,dostupnost:number,cena:number,IdDobavljaca:number) {
        this.IdProizvoda =IdProizvoda;
        this.naziv=naziv;
        this.dostupnost=dostupnost;
        this.cena=cena;
        this.IdDobavljaca=IdDobavljaca;
    }
}
