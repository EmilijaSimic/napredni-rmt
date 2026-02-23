import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {
  KompanijaService
} from '../shared/services/kompanija.service';
import {
  KompanijaResponseModel
} from '../shared/models/kompanija';

@Component({
  selector: 'la-partner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './partner-modal.component.html',
  styleUrls: ['./partner-modal.component.scss']
})
export class PartnerModalComponent implements OnInit {
  kompanije: KompanijaResponseModel[] = [];
  selektovane: Set < number > = new Set();
  otvorenoDetaljnije: Set < number > = new Set();
  loading = false;

  constructor(private dialogRef: MatDialogRef < PartnerModalComponent > , private kompanijaService: KompanijaService) {}

  ngOnInit(): void {
    this.loading = true;
    this.kompanijaService.getAll().subscribe({
      next: res => {
        // sve kompanije sa dodatnim poljima
        this.kompanije = res.map(r => ({
          ...r,
          websajt: r.websajt ?? '',
          kontakt: r.kontakt ?? '',
          stanje: r.stanje || 'Nije dodeljeno', // <-- obavezno default
          zaduzen: r.zaduzen ?? '',
          datumCimanja: r.datumCimanja ?? new Date(),
          datumPodsetnik: r.datumPodsetnik ?? new Date(),
          datumPoziva: r.datumPoziva ?? new Date(),
          odobreno: r.odobreno ?? false
        }));
        this.loading = false;
      },
      error: () => (this.loading = false)
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

  potvrdi() {
    // vraćamo samo selektovane kompanije
    const result = this.kompanije.filter(k => this.selektovane.has(k.ID));
    this.dialogRef.close(result);
  }

  searchTerm = '';

  filtriraneKompanije(): KompanijaResponseModel[] {
    if (!this.searchTerm.trim()) {
      return this.kompanije;
    }

    const term = this.searchTerm.toLowerCase();
    return this.kompanije.filter(k =>
      k.naziv.toLowerCase().includes(term)
    );
  }

  otkazi() {
    this.dialogRef.close();
  }
}