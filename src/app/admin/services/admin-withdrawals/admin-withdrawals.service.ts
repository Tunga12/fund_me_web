import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { environment } from 'src/environments/environment';
import { WithdrawalsPage } from '../../models/withdrawals-page.model';

@Injectable({
  providedIn: 'root',
})
export class AdminWithdrawalsService {
  constructor(private http: HttpClient) {}

  // get withdrawals with status pending
  getPendingWithdrawals(): Observable<WithdrawalsPage> {
    return this.http.get<WithdrawalsPage>(
      `${environment.BASE_URL}/api/withdrawal/status/pending`
    );
  }

  // get withdrawals with status accepted
  getAcceptedWithdrawals(): Observable<WithdrawalsPage> {
    return this.http.get<WithdrawalsPage>(
      `${environment.BASE_URL}/api/withdrawal/status/accepted`
    );
  }

  // get withdrawals with status declined
  getDeclinedWithdrawals(): Observable<WithdrawalsPage> {
    return this.http.get<WithdrawalsPage>(
      `${environment.BASE_URL}/api/withdrawal/status/declined`
    );
  }

  // accept a withdrawal request
  acceptWithdrawalRequest(withdrawalId: string) {
    return this.http.put(
      `${environment.BASE_URL}/api/withdrawal/${withdrawalId}`,
      {
        accepted: true,
      },
      {
        responseType: 'text',
      }
    );
  }

  // accept a withdrawal request
  declineWithdrawalRequest(withdrawalId: string, reason: string) {
    return this.http.put(
      `${environment.BASE_URL}/api/withdrawal/${withdrawalId}`,
      {
        accepted: false,
        reason: reason,
      },
      {
        responseType: 'text',
      }
    );
  }
}
