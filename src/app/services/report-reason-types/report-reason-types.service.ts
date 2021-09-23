import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportReasonType } from 'src/app/admin/models/report-reason-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportReasonTypesService {

  constructor(
    private http:HttpClient
  ) { }
  // get all available reasons
  getReportReasonTypes(): Observable<ReportReasonType[]> {
    return this.http.get<ReportReasonType[]>(`${environment.BASE_URL}/api/reasons`);
  }
}
