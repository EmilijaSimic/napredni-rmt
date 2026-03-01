import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  AccountService
} from '../services/account.service';

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

  constructor(private accountService: AccountService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isAdmin = this.accountService.isInRole('admin');
    this.route.params.subscribe(params => {
      this.projekatId = params.id;
    });
  }

  signOut() {
    this.accountService.signOut();
  }
}
