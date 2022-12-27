import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { param } from 'src/app/models/TypeOfFilterParam';
import { ConfigService } from '../../services/config.service';
import { debounceTime, fromEvent, map } from 'rxjs';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements AfterViewInit {
  @Input() param: param;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('priceInput') priceInput: ElementRef;
  @ViewChild('dateInput') dateInput: ElementRef;
  constructor(private configService: ConfigService) {}

  setSelect(event: any) {
    if (!event.value) {
      this.configService.setSelect('');
    } else {
      this.configService.setSelect(event.value);
    }
  }
  setSortAs(event: any) {
    if (!event.value) {
      this.configService.setSortAs('');
    } else {
      this.configService.setSortAs(event.value);
    }
  }
  setSortBy(event: any) {
    if (!event.value) {
      this.configService.setSortBy('');
    } else {
      this.configService.setSortBy(event.value);
    }
  }
  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(1000),
        map((event: any) => event.target.value)
      )
      .subscribe((data) => this.configService.setSearch(data));

    if (this.priceInput) {
      fromEvent(this.priceInput.nativeElement, 'input')
        .pipe(
          debounceTime(1000),
          map((event: any) => event.target.value)
        )
        .subscribe((data) => this.configService.setPrice(+data));
    }
    if (this.dateInput) {
      fromEvent(this.dateInput.nativeElement, 'input')
        .pipe(
          debounceTime(1000),
          map((event: any) => event.target.value)
        )
        .subscribe((data) => this.configService.setDate(data));
    }
  }
}
