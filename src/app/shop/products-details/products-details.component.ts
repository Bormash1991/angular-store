import { API_PATH } from './../../shared/services/base-http.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  EventType,
} from '@angular/router';
import { ProductsService } from 'src/app/shop/products.service';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { UpdateInfService } from './shared/update-inf.service';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  subj: Subscription;
  path = API_PATH;
  constructor(
    private UpdateInfService: UpdateInfService,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subj = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getData();
      });
    this.getData();
  }
  getData(newId: string = '') {
    const id = newId || this.route.snapshot.paramMap.get('id');
    this.productsService.getDataById<TypeOfProduct>(id).subscribe((data) => {
      if (data) {
        this.productData = data;
      }
    });
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
