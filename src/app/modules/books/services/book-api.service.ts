import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Book, BookWithPrefered } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseURL}/products`);
  }

  getProductsByQuery(titleOrAuthor: string, title: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `http://localhost:3000/products/?aOt=${titleOrAuthor}&name=${title}`
    );
  }
}
