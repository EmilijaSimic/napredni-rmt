import {
  Component
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import {
  KompanijaResponseModel
} from '../shared/models/kompanija';

@Component({
  selector: 'la-kreiraj-kompaniju-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './kreiraj-kompaniju-modal.component.html',
  styleUrls: ['./kreiraj-kompaniju-modal.component.scss']
})
export class KreirajKompanijuModalComponent {

  model: KompanijaResponseModel = {
    ID: 0,
    naziv: '',
    brojCimanja: 0,
    brojOdbijanja: 0,
    brojPrihvatanja: 0,
    napomena: '',
    websajt: '',
    kontakt: '',
    stanje: 'Nije dodeljeno',
    zaduzen: '',
    datumCimanja: new Date(),
    datumPodsetnik: new Date(),
    datumPoziva: new Date(),
    odobreno: false
  };

  constructor(private dialogRef: MatDialogRef < KreirajKompanijuModalComponent > ) {}

  potvrdi() {
    if (!this.model.naziv.trim()) {
      return;
    }

    this.model.ID = Date.now(); // privremeni ID dok nema backend
    this.dialogRef.close(this.model);
  }

  otkazi() {
    this.dialogRef.close();
  }
}