import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

import {
  AccountService
} from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // TODO: napravi pravu proveru da li taj korisnik moze da pristupi tom projektu ili na osnovu tokena ili na osnovu poziva ka backu

    return true;
  }
}
