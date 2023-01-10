import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://hys-fe-course-api.vercel.app/auth/login';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  setAuthToken(token: String) {
    this.localStorageService.setData('authToken', token);
  }
  getAuthToken() {
    return this.localStorageService.getData('authToken');
  }
  logIn<T>(data: any) {
    return this.http.post<T>(this.URL, data);
  }
}
