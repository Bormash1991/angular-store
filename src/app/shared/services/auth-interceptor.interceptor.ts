import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpSentEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq).pipe(
        tap({
          next: (next) => {},
          error: (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401 && this.router.url != '/login') {
                this.router.navigateByUrl('401');
                this.localStorageService.deleteData('authToken');
              }
              if (error.status === 404) {
                this.router.navigateByUrl('404');
              }
              if (error.status === 403) {
                this.router.navigateByUrl('403');
              }
            }
          },
        })
      );
    }

    return next.handle(req).pipe(
      tap({
        next: (next) => {},
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 && this.router.url != '/login') {
              this.router.navigateByUrl('401');
            }
            if (error.status === 404) {
              this.router.navigateByUrl('404');
            }
            if (error.status === 403) {
              this.router.navigateByUrl('403');
            }
          }
        },
      })
    );
  }
}
