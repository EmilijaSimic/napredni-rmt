import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { KorisnikService } from '../shared/services/korisnik.service';

@Component({
  selector: 'la-kreiraj-korisnika-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './kreiraj-korisnika-modal.component.html',
  styleUrl: './kreiraj-korisnika-modal.component.scss',
})
export class KreirajKorisnikaModalComponent {
  form = {
    ime: '',
    prezime: '',
    username: '',
    lozinka: '',
    tip: 'clan',
  };

  tipovi = ['koordinator', 'clan'];
  saving = false;
  errorMsg = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { iteracijaId: number },
    private dialogRef: MatDialogRef<KreirajKorisnikaModalComponent>,
    private korisnikService: KorisnikService,
  ) {}

  sacuvaj(): void {
    const { ime, prezime, username, lozinka, tip } = this.form;
    if (!ime || !prezime || !username || !lozinka) {
      this.errorMsg = 'Sva polja su obavezna.';
      return;
    }
    this.saving = true;
    this.errorMsg = '';
    this.korisnikService.create({ ime, prezime, username, lozinka, tip, iteracija_id: this.data.iteracijaId }).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.saving = false;
        this.errorMsg = err?.error?.message ?? 'Greška pri kreiranju korisnika.';
      },
    });
  }

  zatvori(): void {
    this.dialogRef.close();
  }
}
