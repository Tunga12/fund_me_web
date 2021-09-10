import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from './../../models/report.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  report(report: Report): Observable<Report> {
    return this.http.post<Report>(`${environment.BASE_URL}/api/report`, report);
  }
}
