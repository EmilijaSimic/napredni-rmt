import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LS_REFRESH_TOKEN, LS_USER_ITERACIJA_ID, LS_USER_LANGUAGE, LS_USER_ROLES, LS_USER_TOKEN } from '../constants';
import { AuthResponseModel, UserLoginModel, UserMeModel, UserRegisterModel } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  user: UserMeModel = {} as UserMeModel;

  private readonly API_ENDPOINT: string = `${environment.apiUrl}/accounts`;
  // httpDirect bypasses interceptors — used for refresh to avoid infinite loop
  private readonly httpDirect: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpDirect = new HttpClient(handler);
  }

  signUp(model: UserRegisterModel): Observable<AuthResponseModel> {
    return this.http
      .post<AuthResponseModel>(`${this.API_ENDPOINT}/register`, model)
      .pipe(tap(resData => this.handleAuthentication(resData)));
  }

  signIn(model: UserLoginModel): Observable<AuthResponseModel> {
    return this.http
      .post<AuthResponseModel>(`${this.API_ENDPOINT}/login`, model)
      .pipe(tap(resData => this.handleAuthentication(resData)));
  }

  signOut() {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    if (refreshToken) {
      this.http.post(`${this.API_ENDPOINT}/logout`, {}).subscribe({ error: () => {} });
    }

    const language = localStorage.getItem(LS_USER_LANGUAGE);
    localStorage.clear();
    localStorage.setItem(LS_USER_LANGUAGE, language);
    location.href = '/';
  }

  refreshAccessToken(): Observable<{ token: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    return this.httpDirect
      .post<{ token: string; refreshToken: string }>(`${this.API_ENDPOINT}/refresh`, { refreshToken })
      .pipe(tap(res => {
        localStorage.setItem(LS_USER_TOKEN, res.token);
        localStorage.setItem(LS_REFRESH_TOKEN, res.refreshToken);
      }));
  }

  authenticated(): boolean {
    const token = localStorage.getItem(LS_USER_TOKEN);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp * 1000 > Date.now()) return true;
    } catch {}
    // Access token expired — still authenticated if refresh token exists (interceptor will refresh)
    return localStorage.getItem(LS_REFRESH_TOKEN) != null;
  }

  handleAuthentication(authResponse: AuthResponseModel) {
    localStorage.removeItem(LS_USER_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
    localStorage.removeItem(LS_USER_ROLES);
    localStorage.removeItem(LS_USER_ITERACIJA_ID);
    const parsedToken = this.parseJwt(authResponse.token);
    localStorage.setItem(LS_USER_TOKEN, authResponse.token);
    localStorage.setItem(LS_USER_ROLES, parsedToken.roles);
    if ((authResponse as any).refreshToken) {
      localStorage.setItem(LS_REFRESH_TOKEN, (authResponse as any).refreshToken);
    }
    if (parsedToken.iteracija_id != null) {
      localStorage.setItem(LS_USER_ITERACIJA_ID, String(parsedToken.iteracija_id));
    } else {
      localStorage.removeItem(LS_USER_ITERACIJA_ID);
    }
  }

  getIteracijaId(): number | null {
    const id = localStorage.getItem(LS_USER_ITERACIJA_ID);
    return id ? +id : null;
  }

  getLoggedUserRoles() {
    return localStorage.getItem(LS_USER_ROLES);
  }

  isInRole(roleName: string): boolean {
    if (!this.authenticated()) return false;
    const roles = this.getLoggedUserRoles();
    return !!roles && roles.includes(roleName);
  }

  getMyUserInfo(): Observable<UserMeModel> {
    return this.http.get<UserMeModel>(`${this.API_ENDPOINT}/me`);
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
