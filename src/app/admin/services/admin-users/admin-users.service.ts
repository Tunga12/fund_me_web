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
  verifyUser(id: string, user: User): Observable<User> {
    let verifiedUser: User = {
      isVerified: true,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return this.http.put<User>(
      `${environment.BASE_URL}/api/users/${id}`,
      verifiedUser
    );
  }

  // un verify a user
  unVerifyUser(id: string, user: User): Observable<User> {
    let notVerifiedUser: User = {
      isVerified: false,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return this.http.put<User>(
      `${environment.BASE_URL}/api/users/${id}`,
      notVerifiedUser
    );
  }
  // get currently logged in user
  async getCurrentUser() {
    return await this.http
      .get<User>(`${environment.BASE_URL}/api/users/me`)
      .toPromise();
  }

  async getUsersCount(startDate: Date, endDate: Date): Promise<number> {
    let count = await this.http
      .post<{ count: number }>(`${environment.BASE_URL}/api/users/count`, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      .toPromise();

    return count.count;
  }
}
