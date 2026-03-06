import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LS_REFRESH_TOKEN, LS_USER_TOKEN } from '../constants';
import { AccountService } from './account.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(LS_USER_TOKEN);

    if (token && request.url.includes(environment.apiBaseUrl)) {
      request = this.attachToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(request, next);
        }
        return throwError(() => error.error ?? error);
      })
    );
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);

    if (!refreshToken || request.url.includes('/accounts/refresh')) {
      this.accountService.signOut();
      return throwError(() => new Error('Session expired'));
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      return this.accountService.refreshAccessToken().pipe(
        switchMap(res => {
          this.isRefreshing = false;
          this.refreshSubject.next(res.token);
          return next.handle(this.attachToken(request, res.token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.refreshSubject.next(null);
          this.accountService.signOut();
          return throwError(() => err);
        })
      );
    }

    return this.refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.attachToken(request, token)))
    );
  }

  private attachToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
