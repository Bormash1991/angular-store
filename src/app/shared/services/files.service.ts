import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService extends BaseHttpService {
  override params = 'files/';
}
