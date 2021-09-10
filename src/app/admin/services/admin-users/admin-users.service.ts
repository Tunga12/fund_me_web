import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  constructor(private http: HttpClient) {}

  // get all users
  async getAllUsers() {
    return await this.http
      .get<User[]>(`${environment.BASE_URL}/api/users`)
      .toPromise();
  }

  // verify user
  verifyUser(user: User): Observable<User> {
    let id = user._id;
    delete user._id;
    delete user.__v;
    delete user.paymentMethods;

    let verifiedUser={...user, isVerified:true}
    console.log(verifiedUser);
    
    return this.http.put<User>(`${environment.BASE_URL}/api/users/${id}`, verifiedUser);
  }

  // get currently logged in user
  async getCurrentUser() {
    return await this.http
      .get<User>(`${environment.BASE_URL}/api/users/me`)
      .toPromise();
  }
}
