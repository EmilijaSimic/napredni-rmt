import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import {
  ActivatedRoute
} from '@angular/router';

import {
  KompanijaDetaljiModalComponent
} from '../kompanija-detalji-modal/kompanija-detalji-modal.component';
import {
  KreirajKompanijuModalComponent
} from '../kreiraj-kompaniju-modal/kreiraj-kompaniju-modal.component';
import {
  PartnerModalComponent
} from '../partner-modal/partner-modal.component';
import {
  TipPartnera
} from '../shared/enums/tip-partnera.enum';
import {
  KompanijaResponseModel
} from '../shared/models/kompanija';
import {
  PartneriMenuComponent
} from '../shared/partneri-menu/partneri-menu.component';

@Component({
  selector: 'la-partneri',
  standalone: true,
  imports: [PartneriMenuComponent, CommonModule, MatDialogModule],
  templateUrl: './partneri.component.html',
  styleUrls: ['./partneri.component.scss']
})
export class PartneriComponent implements OnInit {
  partneri: KompanijaResponseModel[] = [];
  projekatId: number;
  tipPartnera: TipPartnera;
  status: string;
  TipPartnera = TipPartnera;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projekatId = params.id;
    });

    this.route.queryParams.subscribe(params => {
      this.tipPartnera = params.tipPartnera;
      this.status = params.status;
    });

    // TODO: napraviti poziv ka backu na osnovu projekatId, tipPartnera i status

    // TODO: ovo je samo fake poziva
    if (this.tipPartnera === TipPartnera.ROBNI) {
      this.partneri = [{
          ID: 1,
          naziv: 'Coca Cola Srbija',
          brojCimanja: 3,
          brojOdbijanja: 1,
          brojPrihvatanja: 2,
          napomena: 'Daju piće za događaje',
          websajt: 'https://coca-cola.rs',
          kontakt: 'office@coca-cola.rs',
          zaduzen: 'Nevena',
          stanje: this.status || 'u_toku',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: this.status === 'potvrdjeni'
        },
        {
          ID: 2,
          naziv: 'Red Bull Srbija',
          brojCimanja: 2,
          brojOdbijanja: 0,
          brojPrihvatanja: 2,
          napomena: 'Energetska pića',
          websajt: 'https://redbull.com',
          kontakt: 'info@redbull.rs',
          zaduzen: 'Marko',
          stanje: this.status || 'u_toku',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: this.status === 'potvrdjeni'
        }
      ];
    }

    if (this.tipPartnera === TipPartnera.FINANSIJSKI) {
      this.partneri = [{
          ID: 3,
          naziv: 'Raiffeisen Banka',
          brojCimanja: 4,
          brojOdbijanja: 2,
          brojPrihvatanja: 1,
          napomena: 'Sponzorstvo za IT događaj',
          websajt: 'https://raiffeisenbank.rs',
          kontakt: 'sponzorstva@raiffeisen.rs',
          zaduzen: 'Jovana',
          stanje: this.status || 'u_toku',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: this.status === 'potvrdjene'
        },
        {
          ID: 4,
          naziv: 'NLB Komercijalna',
          brojCimanja: 1,
          brojOdbijanja: 0,
          brojPrihvatanja: 1,
          napomena: 'Finansijska podrška',
          websajt: 'https://nlbkb.rs',
          kontakt: 'office@nlbkb.rs',
          zaduzen: 'Nikola',
          stanje: this.status || 'u_toku',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: this.status === 'potvrdjene'
        }
      ];
    }
  }


  openRobniModal() {
    const dialogRef = this.dialog.open(PartnerModalComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe((result: KompanijaResponseModel[] | undefined) => {
      if (result) {
        result.forEach(k => {
          if (!this.partneri.find(r => r.ID === k.ID)) {
            this.partneri.push(k);
          }
        });
      }
    });
  }

  openKreirajKompanijuModal() {
    const dialogRef = this.dialog.open(KreirajKompanijuModalComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe((result: KompanijaResponseModel | undefined) => {
      if (result) {
        this.partneri.push(result);
      }
    });
  }


  getStanjeClass(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno':
        return 'stanje-odobreno';
      case 'Odbijeno':
        return 'stanje-odbijeno';
      case 'Poziv':
      case 'Poslat email':
        return 'stanje-poziv-email';
      case 'Nije dodeljeno':
      default:
        return 'stanje-nije-dodeljeno';
    }
  }

  getBorderClass(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno':
        return 'border-odobreno';
      case 'Odbijeno':
        return 'border-odbijeno';
      default:
        return '';
    }
  }

  openDetaljiModal(kompanija: KompanijaResponseModel) {
    this.dialog.open(KompanijaDetaljiModalComponent, {
      width: '600px',
      data: kompanija
    });
  }
}
