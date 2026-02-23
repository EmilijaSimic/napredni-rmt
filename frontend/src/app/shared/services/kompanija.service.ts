import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { KompanijaModel, KompanijaResponseModel } from '../models/kompanija';
@Injectable({
  providedIn: 'root'
})
export class KompanijaService {

  // Fejk baza sa svim poljima, odmah kao KompanijaResponseModel
  private kompanije: KompanijaResponseModel[] = [
    {
      ID: 1,
      naziv: 'Stark',
      brojCimanja: 5,
      brojOdbijanja: 2,
      brojPrihvatanja: 3,
      napomena: 'Samo za tebe ema',
      websajt: 'https://kompanija-a.com',
      kontakt: 'kontakt@a.com',
      stanje: 'Nije dodeljeno',
      zaduzen: 'Marko Marković',
      datumCimanja: new Date('2026-02-10'),
      datumPodsetnik: new Date('2026-02-20'),
      datumPoziva: new Date('2026-02-12'),
      odobreno: true
    },
    {
      ID: 2,
      naziv: 'Chipsy',
      brojCimanja: 3,
      brojOdbijanja: 1,
      brojPrihvatanja: 2,
      napomena: 'Napomena B',
      websajt: 'https://kompanija-b.com',
      kontakt: 'kontakt@b.com',
      stanje: 'Nije dodeljeno',
      zaduzen: 'Jelena Jelić',
      datumCimanja: new Date('2026-02-11'),
      datumPodsetnik: new Date('2026-02-21'),
      datumPoziva: new Date('2026-02-13'),
      odobreno: false
    },
     {
      ID: 3,
      naziv: 'Frikom',
      brojCimanja: 3,
      brojOdbijanja: 1,
      brojPrihvatanja: 2,
      napomena: 'Napomena B',
      websajt: 'https://kompanija-b.com',
      kontakt: 'kontakt@b.com',
      stanje: 'Nije dodeljeno',
      zaduzen: 'Jelena Jelić',
      datumCimanja: new Date('2026-02-11'),
      datumPodsetnik: new Date('2026-02-21'),
      datumPoziva: new Date('2026-02-13'),
      odobreno: false
    },

     {
      ID: 4,
      naziv: 'Domace Kiflice',
      brojCimanja: 3,
      brojOdbijanja: 1,
      brojPrihvatanja: 2,
      napomena: 'Napomena B',
      websajt: 'https://kompanija-b.com',
      kontakt: 'kontakt@b.com',
      stanje: 'Nije dodeljeno',
      zaduzen: 'Jelena Jelić',
      datumCimanja: new Date('2026-02-11'),
      datumPodsetnik: new Date('2026-02-21'),
      datumPoziva: new Date('2026-02-13'),
      odobreno: false
    }
  ];

  constructor() {}

  // Vraća sve kompanije sa svim poljima
  getAll(): Observable<KompanijaResponseModel[]> {
    return of(this.kompanije).pipe(delay(500));
  }

  getById(id: number): Observable<KompanijaResponseModel> {
    const comp = this.kompanije.find(k => k.ID === id)!;
    return of(comp).pipe(delay(300));
  }

  create(model: KompanijaModel): Observable<KompanijaResponseModel> {
    const newId = this.kompanije.length + 1;
    const newComp: KompanijaResponseModel = {
      ...model,
      ID: newId,
      websajt: '',
      kontakt: '',
      stanje: 'Nije dodeljeno',
      zaduzen: '',
      datumCimanja: new Date(),
      datumPodsetnik: new Date(),
      datumPoziva: new Date(),
      odobreno: false
    };
    this.kompanije.push(newComp);
    return of(newComp).pipe(delay(300));
  }
}
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { KompanijaModel } from '../models/kompanija';


// @Injectable({
//   providedIn: 'root'
// })
// export class KompanijaService {
//   private readonly baseUrl = `${environment.apiUrl}/Kompanija`;

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<KompanijaModel[]> {
//     return this.http.get<KompanijaModel[]>(this.baseUrl);
//   }

//   getById(id: number): Observable<KompanijaModel> {
//     return this.http.get<KompanijaModel>(`${this.baseUrl}/${id}`);
//   }

//   create(model: KompanijaModel): Observable<KompanijaModel> {
//     return this.http.post<KompanijaModel>(this.baseUrl, model);
//   }

//   updateAktivan(id: number, aktivan: 'da' | 'ne'): Observable<void> {
//   return this.http.put<void>(`${this.baseUrl}/${id}/aktivan`, {
//     Aktivan: aktivan
//   });
// }
// }
