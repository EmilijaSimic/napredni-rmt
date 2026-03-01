export interface KompanijaBasicModel {
  id: number;
  naziv: string;
  websajt: string;
  kontakt: string;
}

export interface KompanijaModel {
  ID: number;
  naziv: string;
  brojCimanja: number;
  brojOdbijanja: number;
  brojPrihvatanja: number;
  napomena: string;
}

export interface KompanijaResponseModel {
  ID: number;
  naziv: string;
  brojCimanja: number;
  brojOdbijanja: number;
  brojPrihvatanja: number;
  napomena: string;
  websajt: string;
  kontakt: string;
  zaduzen: string;
  stanje: string; // ovde može običan string da TS ne kuka
  datumCimanja: Date;
  datumPodsetnik: Date;
  datumPoziva: Date;
  odobreno: boolean;
}
