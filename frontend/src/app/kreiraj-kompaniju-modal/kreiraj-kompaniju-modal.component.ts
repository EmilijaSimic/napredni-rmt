import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { KompanijaService } from '../shared/services/kompanija.service';

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

  constructor(
    private dialogRef: MatDialogRef<KreirajKompanijuModalComponent>,
    private kompanijaService: KompanijaService,
  ) {}

  potvrdi() {
    if (!this.naziv.trim()) return;

    this.saving = true;
    this.kompanijaService.create(this.naziv, this.websajt, this.kontakt).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Greška pri kreiranju kompanije', err);
        this.saving = false;
      },
    });
  }

  otkazi() {
    this.dialogRef.close(false);
  }
}
