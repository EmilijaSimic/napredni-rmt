import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NazivProjekta } from '../shared/enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../shared/models/iteracija-projekta';
import { IteracijaProjektaService } from '../shared/services/iteracija-projekta.service';

interface ProjectCard {
  iteracija: IteracijaProjekta;
  image: string;
}

@Component({
  selector: 'la-projekti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projekti.component.html',
  styleUrl: './projekti.component.scss'
})
export class ProjektiComponent implements OnInit {

  projects: ProjectCard[] = [];

  private readonly projectImageMap: Record<NazivProjekta, string> = {
    [NazivProjekta.FON_HAKATON]: 'assets/images/hahaton.png',
    [NazivProjekta.HZS]: 'assets/images/hzs.png',
    [NazivProjekta.S2S]: 'assets/images/s2s.png',
    [NazivProjekta.C2S]: 'assets/images/c2s.png',
  };

  constructor(
    private router: Router,
    private iteracijaService: IteracijaProjektaService,
  ) {}

  ngOnInit() {
    forkJoin({
      hakaton: this.iteracijaService.findLast(NazivProjekta.FON_HAKATON),
      hzs: this.iteracijaService.findLast(NazivProjekta.HZS),
      s2s: this.iteracijaService.findLast(NazivProjekta.S2S),
      c2s: this.iteracijaService.findLast(NazivProjekta.C2S),
    }).subscribe({
      next: (results) => {
        this.projects = Object.values(results).map(iteracija => ({
          iteracija,
          image: this.projectImageMap[iteracija.naziv_projekta],
        }));
      },
    });
  }

  goToProject(id: number) {
    this.router.navigate([`projekat/${id}/pocetna`]);
  }
}
