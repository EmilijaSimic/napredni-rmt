import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaterijaliModel } from '../models/materijali';

@Injectable({ providedIn: 'root' })
export class MaterijaliService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/materijali`;

  constructor(private http: HttpClient) {}

  upload(file: File, kompanija_id: number): Observable<MaterijaliModel> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('kompanija_id', String(kompanija_id));
    return this.http.post<MaterijaliModel>(this.API_ENDPOINT, formData);
  }

  getByKompanija(kompanija_id: number): Observable<MaterijaliModel[]> {
    return this.http.get<MaterijaliModel[]>(`${this.API_ENDPOINT}/kompanija/${kompanija_id}`);
  }

  getMoje(): Observable<MaterijaliModel[]> {
    return this.http.get<MaterijaliModel[]>(`${this.API_ENDPOINT}/moje`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_ENDPOINT}/${id}`);
  }
}
