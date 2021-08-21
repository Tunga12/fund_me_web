import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  constructor(private http: HttpClient) { }

  // get all users
 async getAllUsers(){
   return await this.http.get<User[]>(`${environment.BASE_URL}/api/users`).toPromise();
  }
}
