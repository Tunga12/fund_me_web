import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Help } from 'src/app/models/help.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminHelpService {

  constructor(
    private http: HttpClient
  ) { }

  // creates a help
  createHelp(help: Help): Observable<Help> {
    return this.http.post<Help>(`${environment.BASE_URL}/api/help`, help)
  }

  // deletes a help
  deleteHelp(help: Help) {
    return this.http.delete(`${environment.BASE_URL}/api/help/${help._id}`, { responseType: 'text' })
  }

  // edit a help
  editHelp(id:string,help: Help): Observable<Help> {
    return this.http.put<Help>(`${environment.BASE_URL}/api/help/${id}`, help)
  }

  // get all helps available
  getAllHelps(): Observable<Help[]> {
    return this.http.get<Help[]>(`${environment.BASE_URL}/api/help`)
  }

  // get a single help using id
  getHelp(id: string): Observable<Help> {
    return this.http.get<Help>(`${environment.BASE_URL}/api/help/${id}`);
  }
}
