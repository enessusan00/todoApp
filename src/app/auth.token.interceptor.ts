// src/app/auth.token.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpContextToken,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.context.get(BYPASS_LOG) === false) {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (token) {
                request = request.clone({
                    setHeaders: {
                        'x-access-token': token,
                    },
                });
            }
            return next.handle(request);
        }
        return next.handle(request);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  };
  