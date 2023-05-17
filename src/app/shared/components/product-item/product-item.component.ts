import { TypeOfProduct } from '../../../models/TypeOfProduct.inteface';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AddCartItemService } from '../../services/add-cart-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swiper, { Navigation, Pagination } from 'swiper';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit, AfterViewInit {
  @Input() productDate: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: any;
  secondData: TypeOfProduct[];
  @Input() buttonClass: string = 'btn_products';
  @ViewChild('swiper') sliderRef: ElementRef<HTMLElement>;
  swiper: Swiper;
  url: string = '';
  rewiesQuantity: string = '';
  ratingNumber: number = 0;
  constructor(
    private addCartItemService: AddCartItemService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
      this.check(n)
    );
    this.route.url
      .pipe(
        take(1),
        map((segments) => segments.map((segment) => segment.path).join('/'))
      )
      .subscribe((url) => {
        this.url = url;
      });
  }


  ngAfterViewInit() {
    this.swiper = new Swiper(this.sliderRef.nativeElement, {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      speed: 500,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        enabled: false,
      },
      breakpoints: {
        720: {},
      },
    });
  }
  addItem(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
    this.buttonText = 'У кошику';
  }
  check(elems: TypeOfProduct[]) {
    if (!elems.length) {
      this.buttonText = 'Додати';
      this.changeDetector.detectChanges();
    }
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].id == this.productDate.id && elems[i].counter) {
        this.buttonText = 'У кошику';
        this.changeDetector.detectChanges();
        return;
      } else {
        this.buttonText = 'Додати';
        this.changeDetector.detectChanges();
      }
    }
  }
}
