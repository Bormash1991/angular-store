import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductsService } from '../products.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanActivate {
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const id = route.paramMap.get('id');
    return this.productsService.getDataById<TypeOfProduct>(id).pipe(
      map(() => {
        return true;
      }),
      catchError((error) => {
        this.router.navigateByUrl('/404');
        return of(false);
      })
    );
  }
}
