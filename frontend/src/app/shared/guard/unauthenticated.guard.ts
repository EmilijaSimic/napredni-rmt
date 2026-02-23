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
export class UnauthenticatedGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.accountService.authenticated()) {
      return true;
    }

    return this.router.createUrlTree(['/projekti']);
  }
}