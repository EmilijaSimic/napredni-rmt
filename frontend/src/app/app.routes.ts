import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'robni-partneri',
    loadComponent: () =>
      import('./robni-list/robni-list.component').then(c => c.RobniListComponent),
  },
    {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
  },

    {
    path: 'partneri',
    loadComponent: () =>
      import('./partneri/partneri.component').then(c => c.PartneriComponent),
  },
    {
    path: 'finansijski',
    loadComponent: () =>
      import('./partneri/partneri.component').then(c => c.PartneriComponent),
  },

    {
    path: 'promo-materijali',
    loadComponent: () =>
      import('./partneri/partneri.component').then(c => c.PartneriComponent),
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
    path: '',
    redirectTo: 'ucenik',
    pathMatch: 'full',
  }
];
