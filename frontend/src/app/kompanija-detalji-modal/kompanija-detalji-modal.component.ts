import { Component, Inject, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { KompanijaResponseModel, KorisnikModel } from '../shared/models/kompanija';
import { ClanService } from '../shared/services/clan.service';
import { KompanijaService } from '../shared/services/kompanija.service';
import { KorisnikService } from '../shared/services/korisnik.service';

@Component({
  selector: 'la-kompanija-detalji-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './kompanija-detalji-modal.component.html',
  styleUrls: ['./kompanija-detalji-modal.component.scss']
})
export class KompanijaDetaljiModalComponent implements OnInit {

  korisnici: KorisnikModel[] = [];
  stanja: string[] = [];
  selectedKorisnikId: number | null = null;
  dropdownOpen = false;
  stanjeDropdownOpen = false;
  saving = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: KompanijaResponseModel,
    private dialogRef: MatDialogRef<KompanijaDetaljiModalComponent>,
    private clanService: ClanService,
    private kompanijaService: KompanijaService,
    private korisnikService: KorisnikService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    if (!this.data.stanje) {
      this.data.stanje = 'Nije dodeljeno';
    }

    this.selectedKorisnikId = this.data.korisnikId ?? null;

    this.clanService.getStanja().subscribe(res => this.stanja = res);

    if (this.data.iteracijaId) {
      this.korisnikService.getByProject(this.data.iteracijaId).subscribe({
        next: (res) => this.korisnici = res,
        error: () => this.korisnici = [],
      });
    }
  }

  get stanjeClass(): string {
    switch (this.data.stanje) {
      case 'Odobreno': return 'dot-green';
      case 'Odbijeno': return 'dot-red';
      case 'Poziv':
      case 'Poslat email': return 'dot-blue';
      default: return 'dot-gray';
    }
  }

  get selectedKorisnikNaziv(): string {
    const k = this.korisnici.find(k => k.id === this.selectedKorisnikId);
    return k ? `${k.ime} ${k.prezime}` : (this.data.zaduzen || 'Izaberi člana');
  }

  sacuvaj() {
    this.saving = true;

    const kompanijaUpdate$ = this.kompanijaService.updateKompanija(this.data.ID, {
      naziv: this.data.naziv,
      websajt: this.data.websajt,
      kontakt: this.data.kontakt,
    });

    if (!this.data.iteracijaId) {
      kompanijaUpdate$.subscribe({
        next: () => { this.saving = false; this.dialogRef.close(true); },
        error: (err) => { console.error('Greška pri čuvanju', err); this.saving = false; },
      });
      return;
    }

    const iteracijaPayload: Record<string, any> = { stanje: this.data.stanje };
    if (this.data.napomena != null) iteracijaPayload['napomena'] = this.data.napomena;
    if (this.selectedKorisnikId != null) iteracijaPayload['korisnik_id'] = this.selectedKorisnikId;

    forkJoin({
      kompanija: kompanijaUpdate$,
      iteracija: this.kompanijaService.updateKompanijaIteracija(this.data.ID, this.data.iteracijaId, iteracijaPayload),
    }).subscribe({
      next: () => { this.saving = false; this.dialogRef.close(true); },
      error: (err) => { console.error('Greška pri čuvanju', err); this.saving = false; },
    });
  }

  zatvori() {
    this.dialogRef.close();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleStanjeDropdown() {
    this.stanjeDropdownOpen = !this.stanjeDropdownOpen;
  }

  selectKorisnik(k: KorisnikModel) {
    this.selectedKorisnikId = k.id;
    this.data.zaduzen = `${k.ime} ${k.prezime}`;
    this.dropdownOpen = false;
  }

  selectStanje(stanje: string) {
    this.data.stanje = stanje;
    this.stanjeDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
      this.stanjeDropdownOpen = false;
    }
  }
}
