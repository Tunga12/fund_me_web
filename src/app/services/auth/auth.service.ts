import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // log in using email and password
  signIn(emailAndPassword: {
    email: string;
    password: string;
  }): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.BASE_URL}/api/auth`,
      emailAndPassword,
      { observe: 'response' }
    );
  }

  // signup or register user
  signUp(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.BASE_URL}/api/users`, user, {
      observe: 'response',
    });
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('x-auth-token') !== null;
  }
}
