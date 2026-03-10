import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartneriMenuComponent } from '../shared/partneri-menu/partneri-menu.component';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'la-pocetna',
  standalone: true,
  imports: [CommonModule, PartneriMenuComponent],
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  username = '';
  projekatId: number;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.username = this.accountService.getUsername() ?? 'Admin';
    this.route.params.subscribe(params => {
      this.projekatId = +params['id'];
    });
  }

  navigateTo(path: string) {
    const external = ['nova-iteracija', 'promo-materijali'];
    if (external.includes(path)) {
      if (path === 'nova-iteracija') {
        this.router.navigate(['/nova-iteracija'], { queryParams: { projekatId: this.projekatId } });
      } else {
        this.router.navigate([`/${path}`]);
      }
    } else if (path === 'robni-partneri') {
      this.router.navigate([`/projekat/${this.projekatId}/robni-partneri`], { queryParams: { tipPartnera: 'robni' } });
    } else if (path === 'finansijski-partneri') {
      this.router.navigate([`/projekat/${this.projekatId}/finansijski-partneri`], { queryParams: { tipPartnera: 'finansijski' } });
    } else {
      this.router.navigate([`/projekat/${this.projekatId}/${path}`]);
    }
  }
}
