export class Kuponi{
    kod_kupona: number;
    stanje: number;
    validan: number;
    popust: number;

    constructor(kod_kupona:number, stanje:number, validan:number, popust:number){
        this.kod_kupona=kod_kupona;
        this.stanje=stanje;
        this.validan=validan;
        this.popust=popust;
    }
}