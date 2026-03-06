import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { KreirajKorisnikaModalComponent } from '../kreiraj-korisnika-modal/kreiraj-korisnika-modal.component';
import { NazivProjekta } from '../shared/enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../shared/models/iteracija-projekta';
import { KorisnikModel } from '../shared/models/kompanija';
import { PartneriMenuComponent } from '../shared/partneri-menu/partneri-menu.component';
import { IteracijaProjektaService } from '../shared/services/iteracija-projekta.service';
import { KorisnikService } from '../shared/services/korisnik.service';

interface ProjekatTab {
  naziv: NazivProjekta;
  label: string;
  iteracija: IteracijaProjekta | null;
}

@Component({
  selector: 'la-clanovi',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, PartneriMenuComponent],
  templateUrl: './clanovi.component.html',
  styleUrl: './clanovi.component.scss',
})
export class ClanoviComponent implements OnInit {
  projekti: ProjekatTab[] = [
    { naziv: NazivProjekta.FON_HAKATON, label: 'Fon hakaton',              iteracija: null },
    { naziv: NazivProjekta.HZS,         label: 'Hakaton za srednjoškolce', iteracija: null },
    { naziv: NazivProjekta.S2S,         label: 'Studenti studentima',      iteracija: null },
    { naziv: NazivProjekta.C2S,         label: 'Kompanije studentima',     iteracija: null },
  ];

  selectedProjekat: ProjekatTab | null = null;

  clanovi: KorisnikModel[] = [];
  sviKorisnici: KorisnikModel[] = [];
  selectedKorisnikId: number | null = null;

  loadingClanovi = false;
  addingExisting = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private korisnikService: KorisnikService,
    private iteracijaService: IteracijaProjektaService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.korisnikService.getSvi().subscribe({ next: (data) => this.sviKorisnici = data });

    forkJoin({
      hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
      hzs:     this.iteracijaService.findLast(NazivProjekta.HZS),
      s2s:     this.iteracijaService.findLast(NazivProjekta.S2S),
      c2s:     this.iteracijaService.findLast(NazivProjekta.C2S),
    }).subscribe(({ hakaton, hzs, s2s, c2s }) => {
      const map: Record<NazivProjekta, IteracijaProjekta> = {
        [NazivProjekta.FON_HAKATON]: hakaton,
        [NazivProjekta.HZS]: hzs,
        [NazivProjekta.S2S]: s2s,
        [NazivProjekta.C2S]: c2s,
      };
      this.projekti.forEach(p => p.iteracija = map[p.naziv]);

      this.route.params.subscribe(params => {
        const idFromRoute = +params['id'];
        const match = this.projekti.find(p => p.iteracija?.id === idFromRoute);
        this.selectProjekat(match ?? this.projekti[0]);
      });
    });
  }

  selectProjekat(p: ProjekatTab): void {
    this.selectedProjekat = p;
    this.selectedKorisnikId = null;
    this.errorMsg = '';
    this.successMsg = '';
    if (p.iteracija) this.loadClanove(p.iteracija.id);
  }

  private loadClanove(iteracijaId: number): void {
    this.loadingClanovi = true;
    this.korisnikService.getByProject(iteracijaId).subscribe({
      next: (data) => { this.clanovi = data; this.loadingClanovi = false; },
      error: () => this.loadingClanovi = false,
    });
  }

  get iteracijaId(): number | null {
    return this.selectedProjekat?.iteracija?.id ?? null;
  }

  get dostupniKorisnici(): KorisnikModel[] {
    const assignedIds = new Set(this.clanovi.map(c => c.id));
    return this.sviKorisnici.filter(k => !assignedIds.has(k.id));
  }

  dodajPostojeceg(): void {
    if (!this.selectedKorisnikId || !this.iteracijaId) return;
    this.addingExisting = true;
    this.errorMsg = '';
    this.korisnikService.addToIteracija(this.selectedKorisnikId, this.iteracijaId).subscribe({
      next: () => {
        this.addingExisting = false;
        this.selectedKorisnikId = null;
        this.successMsg = 'Član dodat na iteraciju.';
        this.loadClanove(this.iteracijaId!);
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.addingExisting = false;
        this.errorMsg = err?.error?.message ?? 'Greška pri dodavanju člana.';
      },
    });
  }

  openKreirajModal(): void {
    const ref = this.dialog.open(KreirajKorisnikaModalComponent, {
      width: '560px',
      data: { projekti: this.projekti, selectedIteracijaId: this.iteracijaId },
    });
    ref.afterClosed().subscribe((created: boolean) => {
      if (created) {
        this.successMsg = 'Korisnik kreiran i dodat na iteraciju.';
        this.loadClanove(this.iteracijaId!);
        this.korisnikService.getSvi().subscribe({ next: (data) => this.sviKorisnici = data });
        setTimeout(() => this.successMsg = '', 3000);
      }
    });
  }

  ukloni(clan: KorisnikModel): void {
    if (!this.iteracijaId) return;
    this.korisnikService.removeFromIteracija(clan.id, this.iteracijaId).subscribe({
      next: () => this.loadClanove(this.iteracijaId!),
      error: (err) => this.errorMsg = err?.error?.message ?? 'Greška pri uklanjanju.',
    });
  }
}
