import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  AccountService
} from '../services/account.service';
import { LS_LAST_PROJEKAT_ID } from '../constants';

@Component({
  selector: 'la-partneri-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './partneri-menu.component.html',
  styleUrls: ['./partneri-menu.component.scss']
})
export class PartneriMenuComponent implements OnInit {
  projekatId: number;
  isAdmin = false;
  isKoordinator = false;
  isKompanija = false;
  finansijskiOpen = false;
  robniOpen = false;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.isKoordinator = this.accountService.isInRole('koordinator');
    this.isKompanija = this.accountService.isInRole('kompanija');
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projekatId = +params['id'];
        localStorage.setItem(LS_LAST_PROJEKAT_ID, String(this.projekatId));
      } else {
        const stored = localStorage.getItem(LS_LAST_PROJEKAT_ID);
        const iteracijaId = this.accountService.getIteracijaId();
        this.projekatId = stored ? +stored : (iteracijaId ?? null);
      }
    });
    const url = this.router.url;
    this.finansijskiOpen = url.includes('finansijski') || localStorage.getItem('nav_finansijski') === 'true';
    this.robniOpen = url.includes('robni') || localStorage.getItem('nav_robni') === 'true';
  }

  toggleFinansijski(): void {
    this.finansijskiOpen = !this.finansijskiOpen;
    localStorage.setItem('nav_finansijski', String(this.finansijskiOpen));
  }

  toggleRobni(): void {
    this.robniOpen = !this.robniOpen;
    localStorage.setItem('nav_robni', String(this.robniOpen));
  }

  signOut() {
    this.accountService.signOut();
  }
}
