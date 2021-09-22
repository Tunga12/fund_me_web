import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportReasonType } from './../../models/report-reason-type.model';

@Injectable({
  providedIn: 'root'
})
export class ReportReasonTypeService {
  constructor(private http: HttpClient) {}

  // create a ReportReasonType
  createReportReasonType(ReportReasonType:ReportReasonType): Observable<ReportReasonType> {
    return this.http.post<ReportReasonType>(`${environment.BASE_URL}/api/reasons`,ReportReasonType);
  }
  // get all available reasons
  getReportReasonTypes(): Observable<ReportReasonType[]> {
    return this.http.get<ReportReasonType[]>(`${environment.BASE_URL}/api/reasons`);
  }

  // get a ReportReasonType by its id
  getReportReasonType(id:string): Observable<ReportReasonType> {
    return this.http.get<ReportReasonType>(`${environment.BASE_URL}/api/reasons/$${id}`);
  }

  // get all available reasons
  updateReportReasonType(id:string, ReportReasonType:ReportReasonType):Observable<ReportReasonType> {
    delete ReportReasonType._id
    delete ReportReasonType.__v
    return this.http.put<ReportReasonType>(`${environment.BASE_URL}/api/reasons/${id}`,ReportReasonType);
  }

  // get all available reasons
  deleteReportReasonType(id: string){
    return this.http.delete(`${environment.BASE_URL}/api/reasons/${id}`,{responseType:'text'});
  }
}
