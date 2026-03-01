import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClanService {

  // Lista članova
  getClanovi(): Observable<string[]> {
    return of([
      'Marko Marković',
      'Jovana Petrović',
      'Nikola Ilić',
      'Ana Jovanović'
    ]);
  }

  // Lista stanja
  getStanja(): Observable<string[]> {
    return of([
      'Nije dodeljeno',
      'Aktivno',
      'Na čekanju',
      'Poslat email',
      'Poziv',
      'Zatvoreno',
      'Odobreno',
      'Odbijeno',
    ]);
  }
}
