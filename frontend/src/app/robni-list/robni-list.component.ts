import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../shared/menu/menu.component';
import { KompanijaService } from '../shared/services/kompanija.service';
import { RobniModalComponent, RobniModalData } from '../robni-modal/robni-modal.component';
import { KompanijaResponseModel } from '../shared/models/kompanija';

@Component({
  selector: 'la-robni-list',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './robni-list.component.html',
  styleUrls: ['./robni-list.component.scss']
})
export class RobniListComponent implements OnInit {

  robni: KompanijaResponseModel[] = [];

  constructor(
    private dialog: MatDialog,
    private kompanijaService: KompanijaService
  ) {}

  ngOnInit(): void {
    this.loadRobni();
  }

  loadRobni() {
    this.kompanijaService.getAll().subscribe({
      next: res => {
        // mapiramo KompanijaModel u KompanijaResponseModel
        this.robni = res.map(r => ({
          ID: r.ID,
          naziv: r.naziv,
          brojCimanja: r.brojCimanja,
          brojOdbijanja: r.brojOdbijanja,
          brojPrihvatanja: r.brojPrihvatanja,
          napomena: r.napomena,
          websajt: '',
          kontakt: '',
          stanje: '',
          zaduzen: '',
          datumCimanja: new Date(),
          datumpodsetnik: new Date(),
          datumPoziva: new Date(),
          odobreno: false
        }));
      },
      error: err => console.error(err)
    });
  }

  openRobniModal(robni: KompanijaResponseModel | null) {
    if (!robni) {
      const newRobni: KompanijaResponseModel = {
        ID: 0,
        naziv: '',
        brojCimanja: 0,
        brojOdbijanja: 0,
        brojPrihvatanja: 0,
        napomena: '',
        websajt: '',
        kontakt: '',
        stanje: '',
        zaduzen: '',
        datumCimanja: new Date(),
        datumpodsetnik: new Date(),
        datumPoziva: new Date(),
        odobreno: false
      };

      this.dialog.open(RobniModalComponent, {
        panelClass: 'fullscreen-dialog',
        width: '500px',
        data: { robni: newRobni, isNew: true } as RobniModalData
      });

      return;
    }

    // postojeći robni, dohvat kompletnih podataka
    this.kompanijaService.getById(robni.ID).subscribe(fullData => {
      const dialogRef = this.dialog.open(RobniModalComponent, {
        panelClass: 'fullscreen-dialog',
        width: '500px',
        data: { robni: fullData, isNew: false } as RobniModalData
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idx = this.robni.findIndex(r => r.ID === result.ID);
          if (idx !== -1) this.robni[idx] = result;
          else this.robni.push(result);
        }
      });
    });
  }
}
