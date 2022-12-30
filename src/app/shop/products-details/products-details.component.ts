import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AddItemDetailsService } from 'src/app/shared/services/add-item-details.service';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ActivatedRoute } from '@angular/router';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { ProductsService } from 'src/app/shop/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
  productData: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: any;
  allData: TypeOfProduct[];
  constructor(
    private AddItemDetailsService: AddItemDetailsService,
    private route: ActivatedRoute,
    private addCartItemService: AddCartItemService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getDate().subscribe((items) => {
      this.allData = items;
      this.productData = this.AddItemDetailsService.getItem(id, this.allData);
      this.addCartItemService.reloadData();
    });
    this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
      this.check(n)
    );
  }
  setData(elem: TypeOfProduct) {
    this.addCartItemService.setData(elem);
  }
  check(elems: TypeOfProduct[]) {
    for (let i = 0; i < elems.length; i++) {
      if (elems[i].id == this.productData.id) {
        this.productData = elems[i];
        this.buttonText = 'In Cart';
        return;
      }
    }
    this.buttonText = 'Add to Cart';
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
