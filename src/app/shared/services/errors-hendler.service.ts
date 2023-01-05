import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorsHendlerService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
    } else if (error.status === 404) {
    }
  }
}
