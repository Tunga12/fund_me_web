import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from 'src/app/models/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportedFundsService {

  constructor(
    private http: HttpClient
  ) { }

  // returns oservable of all fundraiser reports
  getReports():Observable<Report[]>
  {
    return this.http.get<Report[]>(`${environment.BASE_URL}/api/report`)
  }

}
