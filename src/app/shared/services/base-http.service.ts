import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const API_PATH = 'http://localhost:3000/';
@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected params = '';
  // private URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getData<T>(): Observable<T> {
    return this.http.get<T>(API_PATH + this.params);
  }

  getDataById<T>(id: any): Observable<T> {
    return this.http.get<T>(API_PATH + this.params + id);
  }
  create<T>(data: T): Observable<T> {
    return this.http.post<T>(API_PATH + this.params, data);
  }
  update<T>(id: string, data: T): Observable<T> {
    return this.http.patch<T>(API_PATH + this.params + id, data);
  }
  delete(id: string): Observable<Object> {
    return this.http.delete(API_PATH + this.params + id);
  }
  getDataWithLimit<T>(limit: number, page: number) {
    return this.http.get<T>(
      API_PATH + this.params + `?limit=${limit}&page=${page}`
    );
  }
}
