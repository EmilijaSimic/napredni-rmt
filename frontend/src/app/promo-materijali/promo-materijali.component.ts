import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
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
  isKoordinator = false;

  // Admin/koordinator upload state
  kompanije: KompanijaBasicModel[] = [];
  selectedKompanijaId: number | null = null;
  selectedFile: File | null = null;
  isUploading = false;
  isSyncing = false;
  uploadError = '';
  fileName = '';

  // Shared state
  materijali: MaterijaliModel[] = [];
  searchTerm = '';
  selectedMaterial: MaterijaliModel | null = null;
  deleteTargetId: number | null = null;

  constructor(
    private accountService: AccountService,
    private kompanijaService: KompanijaService,
    private materijaliService: MaterijaliService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');

    if (this.isAdmin || this.isKoordinator) {
      this.kompanijaService.getAll().subscribe({
        next: (data) => this.kompanije = data,
      });
    }

    this.materijaliService.getAll().subscribe({
      next: (data) => this.materijali = data,
    });
  }

  syncTags(): void {
    this.isSyncing = true;
    this.materijaliService.syncTags().subscribe({
      next: () => {
        this.isSyncing = false;
        this.materijaliService.getAll(this.searchTerm).subscribe({
          next: (data) => this.materijali = data,
        });
      },
      error: () => { this.isSyncing = false; },
    });
  }

  onSearch(): void {
    this.materijaliService.getAll(this.searchTerm).subscribe({
      next: (data) => this.materijali = data,
    });
  }

  get materijaliPoKompaniji(): { naziv: string; stavke: MaterijaliModel[] }[] {
    const map = new Map<string, MaterijaliModel[]>();
    for (const m of this.materijali) {
      const naziv = m.kompanija?.naziv ?? 'Nepoznato';
      if (!map.has(naziv)) map.set(naziv, []);
      map.get(naziv)!.push(m);
    }
    return Array.from(map.entries()).map(([naziv, stavke]) => ({ naziv, stavke }));
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
      next: () => {
        this.selectedFile = null;
        this.fileName = '';
        this.isUploading = false;
        this.materijaliService.getAll(this.searchTerm).subscribe({
          next: (data) => this.materijali = data,
        });
      },
      error: () => {
        this.uploadError = 'Greška pri uploadu. Pokušajte ponovo.';
        this.isUploading = false;
      },
    });
  }

  confirmDelete(id: number): void {
    this.deleteTargetId = id;
  }

  cancelDelete(): void {
    this.deleteTargetId = null;
  }

  executeDelete(): void {
    if (this.deleteTargetId === null) return;
    const id = this.deleteTargetId;
    this.deleteTargetId = null;
    this.selectedMaterial = null;
    this.materijaliService.delete(id).subscribe({
      next: () => {
        this.materijali = this.materijali.filter(m => m.id !== id);
      },
    });
  }

  openMaterial(m: MaterijaliModel): void {
    this.selectedMaterial = m;
  }

  closeMaterial(): void {
    this.selectedMaterial = null;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.selectedMaterial = null;
  }

  isVideo(url: string): boolean {
    return /\.(mp4|mov|avi|webm|mkv)(\?.*)?$/i.test(url);
  }
}
