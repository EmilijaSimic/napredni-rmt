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
import { combineLatest } from 'rxjs';

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
import {
  KompanijaService
} from '../shared/services/kompanija.service';

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

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private kompanijaService: KompanijaService,
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, qParams]) => {
      this.projekatId = +params['id'];
      this.tipPartnera = qParams['tipPartnera'];
      this.status = qParams['status'];
      this.loadPartneri();
    });
  }

  private loadPartneri(): void {
    this.kompanijaService.getByIteracija(this.projekatId, this.tipPartnera, this.status).subscribe({
      next: (data) => this.partneri = data,
      error: (err) => console.error('Greška pri učitavanju partnera', err),
    });
  }


  openRobniModal() {
    const dialogRef = this.dialog.open(PartnerModalComponent, {
      width: '700px',
      data: { projekatId: this.projekatId, tipPartnera: this.tipPartnera },
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.loadPartneri();
      }
    });
  }

  openKreirajKompanijuModal() {
    this.dialog.open(KreirajKompanijuModalComponent, { width: '700px' });
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
