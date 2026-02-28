import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  environment
} from 'src/environments/environment';
import {
  TipPartnera
} from '../enums/tip-partnera.enum';
import {
  KompanijaResponseModel
} from '../models/kompanija';

@Injectable({
  providedIn: 'root'
})
export class KompanijaService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/iteracija-projekta`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<KompanijaResponseModel[]> {
    return this.http.get<KompanijaResponseModel[]>(`${environment.apiUrl}/kompanija`);
  }

  create(naziv: string, websajt: string, kontakt: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kompanija`, { naziv, websajt, kontakt });
  }

  batchAddToIteracija(iteracijaId: number, kompanijaIds: number[], tipPartnera: TipPartnera): Observable<any> {
    return this.http.post(
      `${this.API_ENDPOINT}/${iteracijaId}/kompanije/batch`,
      { kompanija_ids: kompanijaIds, tip_partnera: tipPartnera },
    );
  }

  getByIteracija(iteracijaId: number, tipPartnera: TipPartnera, status?: string): Observable<KompanijaResponseModel[]> {
    const params: any = { tipPartnera };
    if (status) params['status'] = status;

    return this.http.get<KompanijaResponseModel[]>(
      `${this.API_ENDPOINT}/${iteracijaId}/kompanije`,
      { params },
    );
  }
}
