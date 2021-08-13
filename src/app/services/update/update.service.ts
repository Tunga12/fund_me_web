import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Update } from './../../models/update.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private http: HttpClient) {}

  // make an update to a fundraiser
  addUpdateToFundraiser(
    fundraiserId: string,
    update: Update
  ): Observable<Update> {
    return this.http.post<Update>(
      `${environment.BASE_URL}/api/updates/${fundraiserId}`,
      update
    );
  }

  // edit update
  editUpdate(id: string, update: Update): Observable<Update> {
    return this.http.put<Update>(
      `${environment.BASE_URL}/api/updates/${id}`,
      update
    );
  }

  // delete update
  deleteUpdate(update: Update) {
    return this.http.delete(
      `${environment.BASE_URL}/api/updates/${update._id}`,
      {
        responseType: 'text',
      }
    );
  }
}
