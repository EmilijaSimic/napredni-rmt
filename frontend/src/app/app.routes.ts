import {
  Routes
} from '@angular/router';

import {
  AuthenticatedGuard
} from './shared/guard/authenticated.guard';
import {
  ProjectGuard
} from './shared/guard/project.guard';
import {
  UnauthenticatedGuard
} from './shared/guard/unauthenticated.guard';

export const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'projekti',
    loadComponent: () =>
      import('./projekti/projekti.component').then(c => c.ProjektiComponent),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'projekat/:id/robni-partneri',
    loadComponent: () =>
      import('./partneri/partneri.component').then(c => c.PartneriComponent),
    canActivate: [AuthenticatedGuard, ProjectGuard]
  },
  {
    path: 'projekat/:id/finansijski-partneri',
    loadComponent: () =>
      import('./partneri/partneri.component').then(c => c.PartneriComponent),
    canActivate: [AuthenticatedGuard, ProjectGuard]
  },
  {
    path: 'promo-materijali',
    loadComponent: () =>
      import('./projekti/projekti.component').then(c => c.ProjektiComponent),
  },
  {
    path: 'svi-partneri-robni',
    loadComponent: () =>
      import('./svi-robni/svi-robni.component').then(c => c.SviRobniComponent),
  },
  {
    path: 'odbijeni-robni',
    loadComponent: () =>
      import('./odbijeni-robni/odbijeni-robni.component').then(c => c.OdbijeniRobniComponent),
  },
  {
    path: 'potvrdjeni-robni',
    loadComponent: () =>
      import('./povrdjeni-robni/povrdjeni-robni.component').then(c => c.PovrdjeniRobniComponent),
  },
  {
    path: 'robni-detalji',
    loadComponent: () =>
      import('./kompanija-detalji-modal/kompanija-detalji-modal.component').then(c => c.KompanijaDetaljiModalComponent),
  },
  {
    path: 'kreiraj-korisnike',
    loadComponent: () =>
      import('./kreiraj-korisnike/kreiraj-korisnike.component').then(c => c.KreirajKorisnikeComponent),
  },
];
