import { Component, OnInit } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  protected date: TypeOfProduct[];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.date = this.productsService.getDateForWelcome();
  }
}
