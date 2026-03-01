import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  ActivatedRoute
} from '@angular/router';
import {
  KorisnikModel
} from '../shared/models/kompanija';
import {
  PartneriMenuComponent
} from '../shared/partneri-menu/partneri-menu.component';
import {
  KorisnikService
} from '../shared/services/korisnik.service';

@Component({
  selector: 'la-clanovi',
  standalone: true,
  imports: [CommonModule, FormsModule, PartneriMenuComponent],
  templateUrl: './clanovi.component.html',
  styleUrl: './clanovi.component.scss',
})
export class ClanoviComponent implements OnInit {
  iteracijaId: number;

  clanovi: KorisnikModel[] = [];
  sviKorisnici: KorisnikModel[] = [];
  selectedKorisnikId: number | null = null;

  noviKorisnik = {
    ime: '',
    prezime: '',
    username: '',
    lozinka: '',
    tip: 'clan',
  };

  tipovi = ['koordinator', 'clan'];

  loadingClanovi = false;
  addingExisting = false;
  creatingNew = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private korisnikService: KorisnikService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.iteracijaId = +params['id'];
      this.loadClanove();
      this.loadSveKorisnike();
    });
  }

  private loadClanove(): void {
    this.loadingClanovi = true;
    this.korisnikService.getByProject(this.iteracijaId).subscribe({
      next: (data) => {
        this.clanovi = data;
        this.loadingClanovi = false;
      },
      error: () => this.loadingClanovi = false,
    });
  }

  private loadSveKorisnike(): void {
    this.korisnikService.getSvi().subscribe({
      next: (data) => this.sviKorisnici = data,
    });
  }

  get dostupniKorisnici(): KorisnikModel[] {
    const assignedIds = new Set(this.clanovi.map(c => c.id));
    return this.sviKorisnici.filter(k => !assignedIds.has(k.id));
  }

  dodajPostojeceg(): void {
    if (!this.selectedKorisnikId) return;
    this.addingExisting = true;
    this.errorMsg = '';
    this.korisnikService.addToIteracija(this.selectedKorisnikId, this.iteracijaId).subscribe({
      next: () => {
        this.addingExisting = false;
        this.selectedKorisnikId = null;
        this.successMsg = 'Član dodat na iteraciju.';
        this.loadClanove();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.addingExisting = false;
        this.errorMsg = err?.error?.message ?? 'Greška pri dodavanju člana.';
      },
    });
  }

  kreirajNovog(): void {
    const {
      ime,
      prezime,
      username,
      lozinka,
      tip
    } = this.noviKorisnik;
    if (!ime || !prezime || !username || !lozinka) {
      this.errorMsg = 'Sva polja su obavezna.';
      return;
    }
    this.creatingNew = true;
    this.errorMsg = '';
    this.korisnikService.create({
      ime,
      prezime,
      username,
      lozinka,
      tip,
      iteracija_id: this.iteracijaId
    }).subscribe({
      next: () => {
        this.creatingNew = false;
        this.noviKorisnik = {
          ime: '',
          prezime: '',
          username: '',
          lozinka: '',
          tip: 'clan'
        };
        this.successMsg = 'Korisnik kreiran i dodat na iteraciju.';
        this.loadClanove();
        this.loadSveKorisnike();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        this.creatingNew = false;
        this.errorMsg = err?.error?.message ?? 'Greška pri kreiranju korisnika.';
      },
    });
  }

  ukloni(clan: KorisnikModel): void {
    this.korisnikService.removeFromIteracija(clan.id, this.iteracijaId).subscribe({
      next: () => this.loadClanove(),
      error: (err) => this.errorMsg = err?.error?.message ?? 'Greška pri uklanjanju.',
    });
  }
}
