import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class CabinetGuard  {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.usersService.getUser().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl('/');
          return false;
        }
      })
    );
  }
}
