// src/app/auth.token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('ACCESS_TOKEN'); // Token'ınızı nerede sakladıysanız
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    return next.handle(request);
  }
}
