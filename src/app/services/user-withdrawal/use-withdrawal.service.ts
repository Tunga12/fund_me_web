import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserWithdrawalService {
  constructor(private http: HttpClient) {}

  createWithdrawal(withdrawal: Withdrawal): Observable<Withdrawal> {
    return this.http.post<Withdrawal>(
      `${environment.BASE_URL}/api/withdrawal`,
      withdrawal
    );
  }
}
