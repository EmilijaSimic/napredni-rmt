import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KompanijaModel } from '../models/kompanija';


@Injectable({
  providedIn: 'root'
})
export class KompanijaService {
  private readonly baseUrl = `${environment.apiUrl}/Kompanija`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<KompanijaModel[]> {
    return this.http.get<KompanijaModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<KompanijaModel> {
    return this.http.get<KompanijaModel>(`${this.baseUrl}/${id}`);
  }

  create(model: KompanijaModel): Observable<KompanijaModel> {
    return this.http.post<KompanijaModel>(this.baseUrl, model);
  }

  updateAktivan(id: number, aktivan: 'da' | 'ne'): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/${id}/aktivan`, {
    Aktivan: aktivan
  });
}
}
