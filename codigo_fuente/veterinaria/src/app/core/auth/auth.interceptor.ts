import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthJWTService } from '../services/auth.service';
import { UtilMinjus } from '../utils/util-minjus';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthJWTService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let secureSite = UtilMinjus.getSecureSite();

    if (request.headers.has('skip')) {
      // Clonar la solicitud omitiendo la cabecera 'skip'
      request = request.clone({ headers: request.headers.delete('skip') });
      return next.handle(request);
    }

    if (!request.url.endsWith('usuario/login')) {
      if(!this.authService.isLogged()){
        this.authService.logout();
      }
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 0) {
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authService.logout();
        }
        return throwError(() => err);
      })
    );
  }
}
