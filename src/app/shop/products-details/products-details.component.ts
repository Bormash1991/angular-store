import { Comments } from './../../models/TypeOfProduct.inteface';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  OnChanges,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  EventType,
} from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { BehaviorSubject, Subscription, filter, switchMap } from 'rxjs';
import { UpdateInfService } from './shared/update-inf.service';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  subj: Subscription;

  previousUrl = '';
  constructor(
    private UpdateInfService: UpdateInfService,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subj = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd && this.previousUrl !== event.url) {
          this.getData();
          this.previousUrl = event.url;
        }
      });
    this.getData();
  }
  getData() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.productsService.getProductById(id).subscribe((data) => {
      if (data) {
        this.productData = data;
        this.UpdateInfService.setData(data);
      }
    });
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
