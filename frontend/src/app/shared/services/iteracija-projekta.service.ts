import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NazivProjekta } from '../enums/naziv-projekta.enum';
import { IteracijaProjekta } from '../models/iteracija-projekta';

@Injectable({ providedIn: 'root' })
export class IteracijaProjektaService {
  private readonly API_ENDPOINT = `${environment.apiUrl}/iteracija-projekta`;

  constructor(private http: HttpClient) {}

  findLast(naziv: NazivProjekta): Observable<IteracijaProjekta> {
    return this.http.get<IteracijaProjekta>(`${this.API_ENDPOINT}/poslednji`, {
      params: { naziv },
    });
  }
}
