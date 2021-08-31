import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Help } from 'src/app/models/help.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private http: HttpClient) {}

  // get all helps
  getHelps(): Observable<Help[]> {
    return this.http.get<Help[]>(`${environment.BASE_URL}/api/help`);
  }

  // get helps by their categoy
  getHelpsByCategory(category: string): Observable<Help[]> {
    return this.http.get<Help[]>(
      `${environment.BASE_URL}/api/help/category/${category}`
    );
  }
}
