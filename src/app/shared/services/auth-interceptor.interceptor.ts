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
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authReq);
    }

    return next.handle(req).pipe(
      tap({
        next: (next) => {},
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
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
