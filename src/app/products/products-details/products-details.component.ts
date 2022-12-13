import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddItemDetailsService } from 'src/app/shared/services/add-item-details.service';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ActivatedRoute } from '@angular/router';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  product: TypeOfProduct;
  constructor(
    private AddItemDetailsService: AddItemDetailsService,
    private route: ActivatedRoute,
    private addCartItemService: AddCartItemService
  ) {}
  ngOnDestroy(): void {
    this.addCartItemService.arrSubject$.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.AddItemDetailsService.getItem(id);
  }
}
