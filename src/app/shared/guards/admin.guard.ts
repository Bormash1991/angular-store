import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.userService.checkAdmin().pipe(
      map((val) => {
        if (val) {
          return true;
        } else {
          this.router.navigateByUrl('');
          return false;
        }
      })
    );
  }
}
