import { Comments } from './../../../models/TypeOfProduct.inteface';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() data: Comments[];
  @Input() addClass: string = '';
  @Input() starsRating: number = 0;
  @Input() showText: boolean = true;
  @Input() readOnly: boolean = true;
  ratingNumber: number = 0;
  rewiesQuantity: string = '';

  ngOnInit(): void {
    this.setRating();
  }
  setRating() {
    if (this.showText) {
      this.ratingNumber =
        this.data.reduce((acc, next) => {
          return (acc += +next.stars);
        }, 0) / this.data.length;
      this.rewiesQuantity =
        this.data.length == 1
          ? this.data.length + ' відгук'
          : this.data.length > 1 && this.data.length < 5
          ? this.data.length + ' відгуки'
          : this.data.length + ' відгуків';
    } else {
      this.ratingNumber = this.starsRating;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.setRating();
  }
  onClick(event: any): void {
    console.log(event);
  }
}
