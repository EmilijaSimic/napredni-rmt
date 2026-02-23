import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'la-projekti',
  imports: [],
  templateUrl: './projekti.component.html',
  styleUrl: './projekti.component.scss'
})
export class ProjektiComponent {
  // TODO: make api request for Emu

  constructor(private router: Router) {}

  goToProjectPartners(id: number) {
    this.router.navigate([`projekat/${id}/robni-partneri`], {
      queryParams: {
        tipPartnera: 'robni'
      }
    });
  }


}
