import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KompanijaBasicModel } from '../shared/models/kompanija';
import { MaterijaliModel } from '../shared/models/materijali';
import { AccountService } from '../shared/services/account.service';
import { KompanijaService } from '../shared/services/kompanija.service';
import { MaterijaliService } from '../shared/services/materijali.service';
import { PartneriMenuComponent } from '../shared/partneri-menu/partneri-menu.component';

@Component({
  selector: 'la-promo-materijali',
  standalone: true,
  imports: [CommonModule, FormsModule, PartneriMenuComponent],
  templateUrl: './promo-materijali.component.html',
  styleUrl: './promo-materijali.component.scss',
})
export class PromoMaterijaliComponent implements OnInit {
  isAdmin = false;

  // Admin state
  kompanije: KompanijaBasicModel[] = [];
  selectedKompanijaId: number | null = null;
  selectedFile: File | null = null;
  materijali: MaterijaliModel[] = [];
  isUploading = false;
  uploadError = '';
  fileName = '';

  constructor(
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private materijaliService: MaterijaliService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');

    if (this.isAdmin) {
      this.kompanijaService.getAll().subscribe({
        next: (data) => this.kompanije = data,
      });
    } else {
      this.materijaliService.getMoje().subscribe({
        next: (data) => this.materijali = data,
      });
    }
  }

  onKompanijaChange(): void {
    if (!this.selectedKompanijaId) return;
    this.materijali = [];
    this.materijaliService.getByKompanija(this.selectedKompanijaId).subscribe({
      next: (data) => this.materijali = data,
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  upload(): void {
    if (!this.selectedFile || !this.selectedKompanijaId) return;
    this.isUploading = true;
    this.uploadError = '';

    this.materijaliService.upload(this.selectedFile, this.selectedKompanijaId).subscribe({
      next: (novi) => {
        this.materijali = [novi, ...this.materijali];
        this.selectedFile = null;
        this.fileName = '';
        this.isUploading = false;
      },
      error: () => {
        this.uploadError = 'Greška pri uploadu. Pokušajte ponovo.';
        this.isUploading = false;
      },
    });
  }

  deleteMaterijal(id: number): void {
    this.materijaliService.delete(id).subscribe({
      next: () => {
        this.materijali = this.materijali.filter(m => m.id !== id);
      },
    });
  }

  isVideo(url: string): boolean {
    return /\.(mp4|mov|avi|webm|mkv)(\?.*)?$/i.test(url);
  }

  selectedKompanijaNaziv(): string {
    return this.kompanije.find(k => k.id === this.selectedKompanijaId)?.naziv ?? '';
  }
}
