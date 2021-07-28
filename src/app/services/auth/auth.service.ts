import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // sign in using email and password
  signIn(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.BASE_URL}/auth`, {
      email,
      password,
    });
  }

  // signup or register user
  signUp(user: User): Observable<User> {
    return this.http.post<User>(`${environment.BASE_URL}/users`, user);
  }
}
