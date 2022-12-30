import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  protected data: TypeOfProduct[];
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.getDate().subscribe((data) => {
      this.data = data.slice(0, 3);
      if (this.data.length) {
        this.loading$.next(false);
      }
    });
  }
}
