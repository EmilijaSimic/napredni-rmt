import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClanService {

  getClanovi(): Observable < string[] > {
    return of([
      'Marko Marković',
      'Jovana Petrović',
      'Nikola Ilić',
      'Ana Jovanović'
    ]);
  }

  getStanja(): Observable < string[] > {
    return of([
      'Poslat email',
      'Poslat podsetnik',
      'Poziv',
      'Odobreno',
      'Odbijeno',
    ]);
  }
}
