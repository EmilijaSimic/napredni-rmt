import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { KompanijaService } from '../shared/services/kompanija.service';
import { TipPartnera } from '../shared/enums/tip-partnera.enum';

interface DialogData {
  tipPartnera: TipPartnera;
  projekatId: number;
}

@Component({
  selector: 'la-kreiraj-kompaniju-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './kreiraj-kompaniju-modal.component.html',
  styleUrls: ['./kreiraj-kompaniju-modal.component.scss']
})
export class KreirajKompanijuModalComponent {
  naziv = '';
  websajt = '';
  kontakt = '';
  saving = false;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<KreirajKompanijuModalComponent>,
    private kompanijaService: KompanijaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  get tipLabel(): string {
    return this.data?.tipPartnera === TipPartnera.FINANSIJSKI ? 'Finansijski' : 'Robni';
  }

  potvrdi() {
    if (!this.naziv.trim()) return;

    this.saving = true;
    this.error = '';
    this.kompanijaService.create(this.naziv, this.websajt, this.kontakt, this.data.tipPartnera).pipe(
      switchMap((kompanija: any) =>
        this.kompanijaService.batchAddToIteracija(
          this.data.projekatId,
          [kompanija.id],
          this.data.tipPartnera,
        )
      ),
    ).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Greška pri kreiranju kompanije', err);
        this.error = 'Greška pri kreiranju. Pokušajte ponovo.';
        this.saving = false;
      },
    });
  }

  otkazi() {
    this.dialogRef.close(false);
  }
}
