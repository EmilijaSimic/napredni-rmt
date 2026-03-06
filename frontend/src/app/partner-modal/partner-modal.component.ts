import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { KompanijaService } from '../shared/services/kompanija.service';
import { TipPartnera } from '../shared/enums/tip-partnera.enum';
import { KompanijaResponseModel } from '../shared/models/kompanija';

interface DialogData {
  projekatId: number;
  tipPartnera: TipPartnera;
}

@Component({
  selector: 'la-partner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './partner-modal.component.html',
  styleUrls: ['./partner-modal.component.scss']
})
export class PartnerModalComponent implements OnInit {
  kompanije: KompanijaResponseModel[] = [];
  selektovane: Set<number> = new Set();
  otvorenoDetaljnije: Set<number> = new Set();
  loading = false;
  saving = false;
  searchTerm = '';

  constructor(
    private dialogRef: MatDialogRef<PartnerModalComponent>,
    private kompanijaService: KompanijaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.kompanijaService.getDostupne(this.data.projekatId, this.data.tipPartnera).subscribe({
      next: (res) => {
        this.kompanije = res.map((r: any) => ({
          ...r,
          ID: r.ID ?? r.id,
          napomena: r.napomena ?? '',
          websajt: r.websajt ?? '',
          kontakt: r.kontakt ?? '',
          stanje: 'Nije dodeljeno',
          zaduzen: '',
          datumCimanja: new Date(),
          datumPodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: false,
          brojCimanja: r.brojCimanja ?? 0,
          brojOdobravanja: r.brojOdobravanja ?? 0,
          brojOdbijanja: r.brojOdbijanja ?? 0,
          napomene: r.napomene ?? [],
        }));
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  toggleSelektovan(id: number) {
    if (this.selektovane.has(id)) {
      this.selektovane.delete(id);
    } else {
      this.selektovane.add(id);
    }
  }

  toggleDetaljnije(id: number) {
    if (this.otvorenoDetaljnije.has(id)) {
      this.otvorenoDetaljnije.delete(id);
    } else {
      this.otvorenoDetaljnije.add(id);
    }
  }

  filtriraneKompanije(): KompanijaResponseModel[] {
    if (!this.searchTerm.trim()) return this.kompanije;
    const term = this.searchTerm.toLowerCase();
    return this.kompanije.filter(k => k.naziv.toLowerCase().includes(term));
  }

  potvrdi() {
    if (this.selektovane.size === 0) return;

    this.saving = true;
    const ids = Array.from(this.selektovane);

    this.kompanijaService.batchAddToIteracija(this.data.projekatId, ids, this.data.tipPartnera).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Greška pri dodavanju partnera', err);
        this.saving = false;
      },
    });
  }

  otkazi() {
    this.dialogRef.close(false);
  }
}
