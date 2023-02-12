import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/auth/login';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  setAuthToken(token: String) {
    this.localStorageService.setData('token', token);
  }
  getAuthToken(): string | [] {
    return this.localStorageService.getData('token');
  }
  logIn<T>(data: Object) {
    return this.http.post<T>(this.URL, data);
  }
}
