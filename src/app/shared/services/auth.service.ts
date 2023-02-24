import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import jwt_decode from 'jwt-decode';
import { decodedUser } from 'src/app/models/decodedUser.interface';
import { unauthorizedUser } from 'src/app/models/unauthorizedUser.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000/auth/';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  setAuthToken(token: String) {
    this.localStorageService.setData('token', token);
  }
  getdecodeToken(): decodedUser | unauthorizedUser {
    const token = this.localStorageService.getData<string>('token');
    if (typeof token == 'string') {
      return jwt_decode(token);
    }
    return { username: 'none', role: 'USER' };
  }
  getAuthToken(): string | [] {
    return this.localStorageService.getData('token');
  }
  logIn<T>(data: Object) {
    return this.http.post<T>(this.URL + 'login', data);
  }
  registration<T>(data: Object) {
    return this.http.post<T>(this.URL + 'registration', data);
  }
}
