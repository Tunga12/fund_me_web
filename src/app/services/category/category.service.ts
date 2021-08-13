import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // get all available categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.BASE_URL}/api/categories`);
  }
}
