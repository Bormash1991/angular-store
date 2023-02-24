import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() data: TypeOfProduct;
  @Input() addClass: string = ''
  ratingNumber: number = 0;
  rewiesQuantity: string = '';
  readOnly: boolean = true;
  ngOnInit(): void {
    this.ratingNumber =
      this.data.comments.reduce((acc, next) => {
        return (acc += +next.stars);
      }, 0) / this.data.comments.length;
    this.rewiesQuantity =
      this.data.comments.length == 1
        ? this.data.comments.length + ' відгук'
        : this.data.comments.length > 1 && this.data.comments.length < 5
        ? this.data.comments.length + ' відгуки'
        : this.data.comments.length + ' відгуків';
  }
}
