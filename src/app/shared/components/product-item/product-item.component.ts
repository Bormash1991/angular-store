import { TypeOfProduct } from '../../../models/TypeOfProduct.inteface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productDate: TypeOfProduct;
  constructor() {}
  ngOnInit(): void {}
}
