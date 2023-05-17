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
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  EventType,
} from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import {
  BehaviorSubject,
  Subscription,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs';
import { UpdateInfService } from './shared/services/update-inf.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  subj: Subscription;
  previousUrl = '';
  categoryName: string;
  constructor(
    private UpdateInfService: UpdateInfService,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private titleService: Title
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
    const url = this.router.url;
    this.categoryName = url.split('/')[1];
  }
  getData() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.productsService.getProductById(id).subscribe((data) => {
      if (data) {
        this.titleService.setTitle(data.name);
        this.productData = data;
        this.UpdateInfService.setData(data);
      }
    });
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
