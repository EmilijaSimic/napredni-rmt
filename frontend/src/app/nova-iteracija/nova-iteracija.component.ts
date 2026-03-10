import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NazivProjekta } from '../shared/enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../shared/models/iteracija-projekta';
import { PartneriMenuComponent } from '../shared/partneri-menu/partneri-menu.component';
import { IteracijaProjektaService } from '../shared/services/iteracija-projekta.service';
import { KreirajIteracijuModalComponent } from './kreiraj-iteraciju-modal.component';

interface ProjectCard {
  naziv: NazivProjekta;
  displayNaziv: string;
  image: string;
  trenutna: IteracijaProjekta | null;
  isCreating: boolean;
  createdId: number | null;
  error: string;
}

@Component({
  selector: 'la-nova-iteracija',
  standalone: true,
  imports: [CommonModule, PartneriMenuComponent, MatDialogModule],
  templateUrl: './nova-iteracija.component.html',
  styleUrl: './nova-iteracija.component.scss',
})
export class NovaIteracijaComponent implements OnInit {
  lastCreated: ProjectCard | null = null;

  projekti: ProjectCard[] = [
    { naziv: NazivProjekta.FON_HAKATON, displayNaziv: 'Fon hakaton',              image: 'assets/images/hahaton.png', trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.HZS,         displayNaziv: 'Hakaton za srednjoškolce', image: 'assets/images/hzs.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.S2S,         displayNaziv: 'Studenti studentima',      image: 'assets/images/s2s.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
    { naziv: NazivProjekta.C2S,         displayNaziv: 'Kompanije studentima',     image: 'assets/images/c2s.png',     trenutna: null, isCreating: false, createdId: null, error: '' },
  ];

  constructor(
    private iteracijaService: IteracijaProjektaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const projekatId = this.route.snapshot.queryParamMap.get('projekatId');

    if (projekatId) {
      this.iteracijaService.findById(+projekatId).subscribe({
        next: (iteracija) => {
          this.projekti = this.projekti.filter(p => p.naziv === iteracija.naziv_projekta);
          this.iteracijaService.findLast(iteracija.naziv_projekta).subscribe({
            next: (poslednja) => this.projekti[0].trenutna = poslednja,
          });
        },
      });
    } else {
      forkJoin({
        hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
        hzs:     this.iteracijaService.findLast(NazivProjekta.HZS),
        s2s:     this.iteracijaService.findLast(NazivProjekta.S2S),
        c2s:     this.iteracijaService.findLast(NazivProjekta.C2S),
      }).subscribe({
        next: ({ hakaton, hzs, s2s, c2s }) => {
          const map: Record<NazivProjekta, IteracijaProjekta> = {
            [NazivProjekta.FON_HAKATON]: hakaton,
            [NazivProjekta.HZS]: hzs,
            [NazivProjekta.S2S]: s2s,
            [NazivProjekta.C2S]: c2s,
          };
          this.projekti.forEach(p => p.trenutna = map[p.naziv]);
        },
      });
    }
  }

  requestConfirm(projekat: ProjectCard): void {
    if (!projekat.trenutna) return;
    const ref = this.dialog.open(KreirajIteracijuModalComponent, {
      width: '420px',
      data: { displayNaziv: projekat.displayNaziv, trenutnaGodina: projekat.trenutna.godina, novaGodina: projekat.trenutna.godina + 1 },
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.kreiraj(projekat);
    });
  }

  kreiraj(projekat: ProjectCard): void {
    if (!projekat.trenutna || projekat.isCreating) return;
    projekat.isCreating = true;
    projekat.error = '';

    const novaGodina = projekat.trenutna.godina + 1;

    this.iteracijaService.create(projekat.naziv, novaGodina).subscribe({
      next: (nova) => {
        projekat.isCreating = false;
        projekat.createdId = nova.id;
        if (projekat.trenutna) projekat.trenutna = { ...projekat.trenutna, godina: novaGodina, id: nova.id };
        this.lastCreated = projekat;
      },
      error: () => {
        projekat.isCreating = false;
        projekat.error = 'Greška pri kreiranju. Pokušajte ponovo.';
      },
    });
  }

  idNaIteraciju(projekat: ProjectCard): void {
    if (!projekat.createdId) return;
    this.router.navigate([`/projekat/${projekat.createdId}/robni-partneri`], {
      queryParams: { tipPartnera: 'robni' },
    });
  }
}
