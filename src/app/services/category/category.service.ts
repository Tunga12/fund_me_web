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

  // get a category by its id
  getCategory(id:string): Observable<Category> {
    return this.http.get<Category>(`${environment.BASE_URL}/api/categories/$${id}`);
  }

  // get all available categories
  updateCategory(id:string, category:Category):Observable<Category> {
    delete category._id
    return this.http.put<Category>(`${environment.BASE_URL}/api/categories/${id}`,category);
  }

  // get all available categories
  deleteCategory(id: string){
    return this.http.delete(`${environment.BASE_URL}/api/categories/${id}`);
  }
}
