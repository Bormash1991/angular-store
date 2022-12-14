import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AddItemDetailsService } from 'src/app/shared/services/add-item-details.service';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ActivatedRoute } from '@angular/router';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  constructor(
    private AddItemDetailsService: AddItemDetailsService,
    private route: ActivatedRoute,
    private addCartItemService: AddCartItemService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productData = this.AddItemDetailsService.getItem(id);
    this.addCartItemService.arrSubject$.subscribe((n) => this.check(n));
    this.check(this.productData);
  }
  click(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
    this.check(elem);
  }
  check(elem: TypeOfProduct) {
    let count = this.addCartItemService.checkButton(elem);
    if (count && elem.id == this.productData.id) {
      this.buttonText = 'In Cart';
    } else if (elem.id == this.productData.id) {
      this.buttonText = 'Add to Cart';
    }
  }
  ngOnDestroy() {}
}
