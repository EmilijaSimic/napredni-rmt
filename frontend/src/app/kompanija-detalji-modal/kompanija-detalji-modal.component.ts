import { Component, Inject, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { KompanijaResponseModel } from '../shared/models/kompanija';
import { ClanService } from '../shared/services/clan.service';

@Component({
  selector: 'la-kompanija-detalji-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './kompanija-detalji-modal.component.html',
  styleUrls: ['./kompanija-detalji-modal.component.scss']
})
export class KompanijaDetaljiModalComponent implements OnInit {

  clanovi: string[] = [];
  stanja: string[] = [];
  dropdownOpen = false;
  stanjeDropdownOpen = false;

  edit = {
    naziv: false,
    websajt: false,
    kontakt: false,
    zaduzen: false,
    stanje: false,
    napomena: false
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: KompanijaResponseModel,
    private dialogRef: MatDialogRef<KompanijaDetaljiModalComponent>,
    private clanService: ClanService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    if (!this.data.stanje) {
      this.data.stanje = 'Nije dodeljeno';
    }

    this.clanService.getClanovi().subscribe(res => this.clanovi = res);
    this.clanService.getStanja().subscribe(res => this.stanja = res);
  }

  zatvori() {
    this.dialogRef.close(this.data);
  }

  toggleEdit(field: keyof typeof this.edit) {
    this.edit[field] = !this.edit[field];
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleStanjeDropdown() {
    this.stanjeDropdownOpen = !this.stanjeDropdownOpen;
  }

  selectClan(clan: string) {
    this.data.zaduzen = clan;
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
