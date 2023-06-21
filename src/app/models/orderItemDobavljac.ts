export class OrderItemDobavljac {
    IdPorudzbine: number;
    IdProizvoda: number;
    dostupnost: number;
    cena: number;

    constructor(IdPorudzbine:number,IdProizvoda:number,dostupnost:number,cena:number) {
        this.IdPorudzbine=IdPorudzbine;
        this.IdProizvoda=IdProizvoda;
        this.dostupnost=dostupnost;
        this.cena=cena;
    }
}
