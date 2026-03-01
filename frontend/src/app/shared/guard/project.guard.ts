import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (this.accountService.isInRole('admin')) return true;
    if (this.accountService.isInRole('kompanija')) return true;

    const requestedId = +route.params['id'];
    const userIteracijaId = this.accountService.getIteracijaId();

    if (!userIteracijaId || requestedId !== userIteracijaId) {
      if (userIteracijaId) {
        return this.router.createUrlTree(['/projekat', userIteracijaId, 'robni-partneri'], {
          queryParams: { tipPartnera: 'robni' }
        });
      }
      return this.router.createUrlTree(['/projekti']);
    }

    return true;
  }
}
