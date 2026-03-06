import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { KompanijaDetaljiModalComponent } from '../kompanija-detalji-modal/kompanija-detalji-modal.component';
import { KreirajKompanijuModalComponent } from '../kreiraj-kompaniju-modal/kreiraj-kompaniju-modal.component';
import { PartnerModalComponent } from '../partner-modal/partner-modal.component';
import { TipPartnera } from '../shared/enums/tip-partnera.enum';
import { IteracijaProjekta } from '../shared/models/iteracija-projekta';
import { KompanijaResponseModel } from '../shared/models/kompanija';
import { PartneriMenuComponent } from '../shared/partneri-menu/partneri-menu.component';
import { AccountService } from '../shared/services/account.service';
import { IteracijaProjektaService } from '../shared/services/iteracija-projekta.service';
import { KompanijaService } from '../shared/services/kompanija.service';

@Component({
  selector: 'la-partneri',
  standalone: true,
  imports: [PartneriMenuComponent, CommonModule, MatDialogModule],
  templateUrl: './partneri.component.html',
  styleUrls: ['./partneri.component.scss']
})
export class PartneriComponent implements OnInit {
  partneri: KompanijaResponseModel[] = [];
  iteracije: IteracijaProjekta[] = [];
  projekatId: number;
  tipPartnera: TipPartnera;
  status: string;
  routeSegment: string;
  TipPartnera = TipPartnera;
  isAdmin = false;
  isKompanija = false;
  showOnboarding = false;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private iteracijaService: IteracijaProjektaService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKompanija = this.accountService.isInRole('kompanija');

    if (!this.isAdmin && !this.isKompanija) {
      const username = this.accountService.getUsername();
      const key = `onboarding_seen_${username}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '1');
        this.showOnboarding = true;
      }
    }

    combineLatest([this.route.params, this.route.queryParams]).subscribe(([params, qParams]) => {
      this.projekatId = +params['id'];
      this.tipPartnera = qParams['tipPartnera'];
      this.status = qParams['status'];

      const url = this.router.url;
      if (url.includes('robni-partneri')) this.routeSegment = 'robni-partneri';
      else if (url.includes('finansijski-partneri')) this.routeSegment = 'finansijski-partneri';

      this.loadPartneri();
      this.loadIteracije();
    });
  }

  private loadPartneri(): void {
    this.kompanijaService.getByIteracija(this.projekatId, this.tipPartnera, this.status).subscribe({
      next: (data) => this.partneri = data,
      error: (err) => console.error('Greška pri učitavanju partnera', err),
    });
  }

  private loadIteracije(): void {
    this.iteracijaService.findById(this.projekatId).subscribe({
      next: (iteracija) => {
        this.iteracijaService.findAllByNaziv(iteracija.naziv_projekta).subscribe({
          next: (sve) => this.iteracije = sve,
        });
      },
    });
  }

  switchIteracija(iteracija: IteracijaProjekta): void {
    const segment = this.routeSegment || 'robni-partneri';
    const qParams: any = { tipPartnera: this.tipPartnera };
    if (this.status) qParams['status'] = this.status;
    this.router.navigate(['/projekat', iteracija.id, segment], { queryParams: qParams });
  }

  openRobniModal() {
    const dialogRef = this.dialog.open(PartnerModalComponent, {
      width: '700px',
      data: { projekatId: this.projekatId, tipPartnera: this.tipPartnera },
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) this.loadPartneri();
    });
  }

  openKreirajKompanijuModal() {
    const dialogRef = this.dialog.open(KreirajKompanijuModalComponent, {
      width: '700px',
      data: { tipPartnera: this.tipPartnera, projekatId: this.projekatId },
    });

    dialogRef.afterClosed().subscribe((created: boolean) => {
      if (created) this.loadPartneri();
    });
  }

  getStanjeClass(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno': return 'stanje-odobreno';
      case 'Odbijeno': return 'stanje-odbijeno';
      case 'Poziv': return 'stanje-poziv-email';
      case 'Poslat email': return 'stanje-email';
      case 'Poslat podsetnik': return 'stanje-podsetnik';
      default: return 'stanje-nije-dodeljeno';
    }
  }

  getBorderClass(stanje: string | undefined): string {
    switch (stanje) {
      case 'Odobreno': return 'border-odobreno';
      case 'Odbijeno': return 'border-odbijeno';
      default: return '';
    }
  }

  closeOnboarding(): void {
    this.showOnboarding = false;
  }

  openDetaljiModal(kompanija: KompanijaResponseModel) {
    const dialogRef = this.dialog.open(KompanijaDetaljiModalComponent, {
      width: '600px',
      maxHeight: '95vh',
      data: { ...kompanija, iteracijaId: this.projekatId }
    });

    dialogRef.afterClosed().subscribe((saved: boolean) => {
      if (saved) this.loadPartneri();
    });
  }
}
