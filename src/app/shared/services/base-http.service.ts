import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected params = '';
  private URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getData<T>(): Observable<T> {
    return this.http.get<T>(this.URL + this.params);
  }

  getDataById<T>(id: any): Observable<T> {
    return this.http.get<T>(this.URL + this.params + id);
  }
  create<T>(data: T): Observable<T> {
    return this.http.post<T>(this.URL + this.params, data);
  }
  update<T>(id: string, data: T): Observable<T> {
    return this.http.put<T>(this.URL + this.params + id, data);
  }
  delete(id: string): Observable<Object> {
    return this.http.delete(this.URL + this.params + id);
  }
  getDataWithLimit<T>(limit: number, page: number) {
    return this.http.get<T>(
      this.URL + this.params + `?limit=${limit}&page=${page}`
    );
  }
}
