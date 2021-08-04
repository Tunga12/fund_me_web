import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('X-Auth-Token');
    if (token) {
      // console.log(token);
      req = req.clone({
        setHeaders: {
          'X-Auth-Token': token,
        },
      });
    }
    return next.handle(req);
  }
}
