import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../shared/button/button.component';
import { InputComponent } from '../shared/input/input.component';
import { KompanijaModel, KompanijaResponseModel } from '../shared/models/kompanija';
import { KompanijaService } from '../shared/services/kompanija.service';


export interface RobniModalData {
  robni: KompanijaResponseModel;
  isNew: boolean;
}

@Component({
  selector: 'la-robni-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './robni-modal.component.html',
  styleUrls: ['./robni-modal.component.scss']
})
export class RobniModalComponent {
  robni: KompanijaResponseModel;  // ← full model

  saving = false;
  errorMessages: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RobniModalData,
    private dialogRef: MatDialogRef<RobniModalComponent>,
    private kompanijaService: KompanijaService
  ) {
    this.robni = data.robni;
  }

  saveChanges() {
    if (!this.robni.naziv) {
      this.errorMessages = ['Molimo popunite Naziv'];
      return;
    }

    this.saving = true;

    // Ako je novi, kreiramo samo osnovna polja
    const model: KompanijaModel = {
      ID: 0,
      naziv: this.robni.naziv,
      brojCimanja: this.robni.brojCimanja ?? 0,
      brojOdbijanja: this.robni.brojOdbijanja ?? 0,
      brojPrihvatanja: this.robni.brojPrihvatanja ?? 0,
      napomena: this.robni.napomena ?? ''
    };

    if (this.data.isNew) {
      this.kompanijaService.create(model).subscribe({
        next: res => {
          this.saving = false;
          this.dialogRef.close(res);
        },
        error: err => {
          this.saving = false;
          this.errorMessages = [err.message];
        }
      });
    } else {
      // update logika može ići ovde
    }
  }
}
