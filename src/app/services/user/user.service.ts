import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // get currently logged in user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.BASE_URL}/api/users/me`);
  }
  // update currently logged in user
  updateCurrentUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.BASE_URL}/api/users/me`, user);
  }

  changePassword(passwords: { oldPassword: string; newPassword: string }) {
    return this.http.put<User>(
      `${environment.BASE_URL}/api/users/changePassword`,
      passwords
    );
  }

  // delete currently logged in user
  deleteCurrentUser() {
    return this.http.delete(`${environment.BASE_URL}/api/users/me`, {
      responseType: 'text',
    });
  }
}
