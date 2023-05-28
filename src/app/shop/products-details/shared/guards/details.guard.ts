import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsGuard  {
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.productsService.getProductById(id!).pipe(
      map((product) => {
        if (!product) {
          this.router.navigateByUrl('404');
          return false;
        } else if (state.url != `/${product.category}/${product.id}`) {
          this.router.navigateByUrl(`/${product.category}/${product.id}`);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
