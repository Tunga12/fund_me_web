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
    req = req.clone({
      setHeaders: {
        'X-Auth-Token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZjNmUyNTIwZjZiZDAwMTVkOTc3NTkiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjI3NDkyNjczfQ._t397Lv4ksmeEPs4nA5UABkEE-SjtmEeXpktrUYkZt8',
      },
      setParams: {},
    });
    return next.handle(req);
  }
}
