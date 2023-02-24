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
import { Router } from '@angular/router';
import Swiper, { Navigation, Pagination } from 'swiper';
import { API_PATH } from '../../services/base-http.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() productDate: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: any;
  secondData: TypeOfProduct[];
  @Input() buttonClass: string = 'btn_products';
  @ViewChild('swiper') sliderRef: ElementRef<HTMLElement>;
  swiper: Swiper;
  path = API_PATH;
  rewiesQuantity: string = '';
  ratingNumber: number = 0;
  constructor(
    private addCartItemService: AddCartItemService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/products/cart') {
      this.buttonText = 'Remove ';
      return;
    }
    this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
      this.check(n)
    );
  }
  ngOnChanges() {
    this.ratingNumber =
      this.productDate.comments.reduce((acc, next) => {
        return (acc += +next.stars);
      }, 0) / this.productDate.comments.length;
    this.rewiesQuantity =
      this.productDate.comments.length == 1
        ? this.productDate.comments.length + ' відгук'
        : this.productDate.comments.length > 1 &&
          this.productDate.comments.length < 5
        ? this.productDate.comments.length + ' відгуки'
        : this.productDate.comments.length + ' відгуків';
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
  addOrDeleteItem(elem: TypeOfProduct) {
    if (this.router.url == '/products/cart') {
      this.addCartItemService.removeSetOfProduct(elem);
      return;
    }
    this.addCartItemService.setData(elem);
    this.buttonText = 'In Cart';
  }
  check(elems: TypeOfProduct[]) {
    if (!elems.length) {
      this.buttonText = 'Add to Cart';
      this.changeDetector.detectChanges();
    }
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].id == this.productDate.id && elems[i].counter) {
        this.buttonText = 'In Cart';
        this.changeDetector.detectChanges();

        return;
      } else {
        this.buttonText = 'Add to Cart';
        this.changeDetector.detectChanges();
      }
    }
  }
}
