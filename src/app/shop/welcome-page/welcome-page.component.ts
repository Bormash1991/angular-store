import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from 'src/app/shared/services/products.service';

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
    // this.productsService
    //   .getData<[TypeOfProduct[], number]>()
    //   .subscribe((data) => {
    //     this.data = data[0].slice(0, 3);
    //     if (this.data.length) {
    //       this.loading$.next(false);
    //     }
    //   });
  }
}
