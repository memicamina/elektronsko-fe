import { Product } from "./product";

export class CartItem{
    id: number;
    IdProizvoda: number;
    nazivProizvoda: string;
    kolicina: number;
    cena: number;
    ukupno: number;
    dostupno: number; 

    constructor(id: number,product: Product,kolicina=1){
        this.id = id;
        this.IdProizvoda = product.IdProizvoda;
        this.nazivProizvoda = product.naziv;
        this.kolicina = kolicina;
        this.cena = product.cena;
        this.ukupno = 0;
        this.dostupno = product.dostupnost;
    }
}