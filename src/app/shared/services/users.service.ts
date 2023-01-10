import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseHttpService {
  override params = 'users/';
}
