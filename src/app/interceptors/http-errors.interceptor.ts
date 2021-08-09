import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEvent, Observable, throwError } from 'rxjs';
import { catchError, mapTo, retry, retryWhen, switchMap } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  private onlineChanges$ = fromEvent(window, 'online').pipe(mapTo(true));
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // retry(3),
      retryWhen((errors) => {
        if (navigator.onLine) {
          return errors.pipe(switchMap((err) => throwError(err)));
        }
        return this.onlineChanges$;
      }),
      catchError((err: Error) => {
        return throwError(err);
      })
    );
  }
}
