import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IteracijaProjekta } from '../shared/models/iteracija-projekta';
import { KorisnikService } from '../shared/services/korisnik.service';

interface ProjekatOption {
  label: string;
  iteracija: IteracijaProjekta | null;
}

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
    iteracijaId: null as number | null,
  };

  tipovi = ['koordinator', 'clan'];
  projekti: ProjekatOption[] = [];
  saving = false;
  errorMsg = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { projekti: ProjekatOption[]; selectedIteracijaId: number | null },
    private dialogRef: MatDialogRef<KreirajKorisnikaModalComponent>,
    private korisnikService: KorisnikService,
  ) {
    this.projekti = data.projekti.filter(p => p.iteracija != null);
    this.form.iteracijaId = data.selectedIteracijaId ?? null;
  }

  sacuvaj(): void {
    const { ime, prezime, username, lozinka, tip, iteracijaId } = this.form;
    if (!ime || !prezime || !username || !lozinka) {
      this.errorMsg = 'Sva polja su obavezna.';
      return;
    }
    if (!iteracijaId) {
      this.errorMsg = 'Morate odabrati projekat.';
      return;
    }
    this.saving = true;
    this.errorMsg = '';
    this.korisnikService.create({ ime, prezime, username, lozinka, tip, iteracija_id: iteracijaId }).subscribe({
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
