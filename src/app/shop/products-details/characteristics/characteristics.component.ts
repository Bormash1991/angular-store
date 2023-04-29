import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UpdateInfService } from '../shared/update-inf.service';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent implements OnInit {
  protected loading$ = new BehaviorSubject<boolean>(true);
  constructor(private updateInfService: UpdateInfService) {}
  ngOnInit(): void {
    this.updateInfService.getData().subscribe((data: TypeOfProduct) => {
      if (data) {
        this.loading$.next(false);

        console.log(data.characteristics);
      }
    });
  }
}
