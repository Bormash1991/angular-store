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
import { ProductsService } from '../../shared/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard implements CanActivate {
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return true;
  }
}
