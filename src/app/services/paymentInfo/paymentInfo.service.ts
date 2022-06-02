import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentInfo } from 'src/app/models/paymentInfo.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentInfoService {
    constructor(private http: HttpClient) { }

    // create a paymentInfo
    createPaymentInfo(paymentInfo: PaymentInfo): Observable<PaymentInfo> {
        return this.http.post<PaymentInfo>(
            `${environment.BASE_URL}/api/paymentInfo`,
            paymentInfo
        );
    }
    // get all available categories
    getPaymentInfos(): Observable<PaymentInfo[]> {
        return this.http.get<PaymentInfo[]>(
            `${environment.BASE_URL}/api/paymentInfo`
        );
    }

    // get a paymentInfo by its id
    getPaymentInfo(id: string): Observable<PaymentInfo> {
        return this.http.get<PaymentInfo>(
            `${environment.BASE_URL}/api/paymentInfo/${id}`
        );
    }

    // get a paymentInfo by its id
    searchShortcode(shortcode: number): Observable<PaymentInfo> {
        return this.http.get<PaymentInfo>(
            `${environment.BASE_URL}/api/paymentInfo/search/${shortcode}`
        );
    }

    // get all available paymentInfo
    updatePaymentInfo(
        id: string,
        paymentInfo: PaymentInfo
    ): Observable<PaymentInfo> {
        delete paymentInfo._id;
        delete paymentInfo.__v;
        return this.http.put<PaymentInfo>(
            `${environment.BASE_URL}/api/paymentInfo/${id}`,
            paymentInfo
        );
    }

    // get all available paymentInfo
    deletePaymentInfo(id: string) {
        return this.http.delete(`${environment.BASE_URL}/api/paymentInfo/${id}`, {
            responseType: 'text',
        });
    }
}
