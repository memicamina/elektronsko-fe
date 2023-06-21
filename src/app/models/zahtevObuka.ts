export class ZahtevObuka {
    idZahteva: number;
    idKursa:number;
    email: string;
    status: string;

    constructor(idZahteva:number,idKursa:number,email:string, status:string) {
        this.idZahteva =idZahteva;
        this.idKursa=idKursa;
        this.email = email;
        this.status=status;
        }
}
