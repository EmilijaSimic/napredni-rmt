export interface KompanijaModel {
  ID: number;
  naziv: string;
  brojCimanja: number;
  brojOdbijanja: number;
  brojPrihvatanja: number;
  napomena: string;
}

export interface KompanijaResponseModel{
  ID: number;
  naziv: string;
  brojCimanja: number;
  brojOdbijanja: number;
  brojPrihvatanja: number;
  napomena: string;
  websajt: string;
  kontakt: string;
  stanje: string;
  zaduzen: string;
  datumCimanja:Date;
  datumpodsetnik:Date;
  datumPoziva: Date;
  odobreno: boolean;
}
