import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  constructor(private http: HttpClient) {}

  getExchangeRate(): Observable<number> {
    return this.http.get<number>(
      'https://free.currconv.com/api/v7/convert?q=USD_ETB&compact=ultra&apiKey=320b48a5bd4a198cd402',{
        headers:{}
      }
    );
  }
}
