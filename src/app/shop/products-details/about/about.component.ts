import {
  Component,
  ViewChild,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription, filter, first, map } from 'rxjs';
import { Char, TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
import { ProductsService } from '../../../shared/services/products.service';
import { UpdateInfService } from '../shared/update-inf.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  productData: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: Subscription;
  dataSubj: Subscription;
  allData: TypeOfProduct[];
  loading$ = new BehaviorSubject<boolean>(true);
  availabilityClass: string = '';
  availabilityText: string = '';
  otherColors: any[] = [];
  chars: string = '';
  @ViewChild('swiper') set swiper(element: { nativeElement: HTMLElement }) {
    if (element) {
      const thumbSlider = new Swiper('.swiper-thumb', {
        loop: true,
        slidesPerView: 4,
        slideToClickedSlide: true,
        slidesPerGroupAuto: true,
        on: {
          click: function () {
            if (thumbSlider.clickedIndex < thumbSlider.slides.length - 1) {
              thumbSlider.slideTo(thumbSlider.clickedIndex - 1);
            }
          },
        },
      });
      const mainSlider = new Swiper(element.nativeElement, {
        modules: [Navigation, Pagination, Thumbs],
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        speed: 500,
        spaceBetween: 10,
        slideToClickedSlide: true,
        scrollbar: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: thumbSlider,
        },
      });
    }
  }
  constructor(
    private addCartItemService: AddCartItemService,
    private productsService: ProductsService,
    private router: Router,
    private UpdateInfService: UpdateInfService
  ) {}

  ngOnInit(): void {
    this.subj = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.otherColors = [];
          this.productData = false as any;
          this.loading$.next(true);
        }
      });
    this.dataSubj = this.UpdateInfService.getData().subscribe((data) => {
      if (data) {
        this.productData = data;
        this.loading$.next(false);
        this.setOtherColors(data);
        if (+data.quantity) {
          this.availabilityText = 'Є в наявності';
          this.availabilityClass = 'is';
        } else {
          this.availabilityText = 'Немає в наявності';
          this.availabilityClass = 'not';
        }
        this.setChars(data.characteristics);
        this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
          this.check(n)
        );
      }
    });
  }
  setChars(data: Char[]) {
    data.forEach((item, i) => {
      if (item.chars) {
        item.chars.forEach((value, j) => {
          this.chars += value.split('-')[1];
          if (i !== data.length - 1 && j !== item.chars.length) {
            this.chars += ' /';
          }
        });
      }
    });
  }
  updateData(item: any) {
    this.router.navigate(['/products', item.id]);
    this.productData = false as any;
    this.loading$.next(true);
  }
  setOtherColors(data: TypeOfProduct) {
    // data.otherIds.forEach((item) => {
    //   this.productsService
    //     .getDataById<TypeOfProduct>(item)
    //     .subscribe((response) => {
    //       this.otherColors.push({
    //         color: response.color,
    //         cssColor: response.cssColor,
    //         id: response.id,
    //       });
    //     });
    // });
  }
  setData(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
  }
  check(elems: TypeOfProduct[]) {
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].id == this.productData.id) {
        this.productData = elems[i];
        this.buttonText = 'У кошику';
        return;
      }
    }
    this.buttonText = 'Купити';
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
    this.dataSubj.unsubscribe();
  }
}
