import { BehaviorSubject, Subscription } from 'rxjs';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ConfigService } from 'src/app/shared/services/config.service';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';
import { TypeOfOrder } from 'src/app/models/TypeOfOrder.interface';
import { CloseOrOpenBarService } from '../shared/services/close-or-open-bar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: TypeOfOrder[] = [];
  public loading$ = new BehaviorSubject<boolean>(true);
  public ordersLength: number;
  public pageIndex: number = 0;
  private filterSubj: Subscription;
  constructor(
    private ordersService: OrdersService,
    private filterService: FilterService<TypeOfOrder>,
    private filterCongig: ConfigService,
    private renderer: Renderer2,
    private closeOrOpenBarService: CloseOrOpenBarService
  ) {}
  ngOnInit(): void {
    this.ordersService.getData<TypeOfOrder[]>().subscribe({
      next: (data) => {
        if (data) {
          this.loading$.next(false);
          this.orders = this.filterService.setData(data, 5);
          this.ordersLength = data.length;
          console.log(data);
        }
      },
      error: (error) => {},
    });
    this.filterSubj = this.filterCongig.configuration$.subscribe((elem) => {
      this.changeData(elem, 'updatedAtOrders');
      if (elem.sortAs) {
        this.sortData(elem);
      }
    });
    this.orders = [];
  }
  close() {
    if (this.closeOrOpenBarService.changingState$.getValue()) {
      this.closeOrOpenBarService.close();
      this.renderer.removeClass(document.documentElement, 'scroll-block');
    }
  }
  onenMenu() {
    this.closeOrOpenBarService.open();
    this.renderer.addClass(document.documentElement, 'scroll-block');
  }
  sortData(elem: filterCongig) {
    this.orders = this.filterService.sortData(elem) as TypeOfOrder[];
  }
  changeData(
    elem: filterCongig,
    param: 'price' | 'updatedAtUsers' | 'updatedAtOrders'
  ) {
    let arr = this.filterService.changeData(elem, param);
    this.orders = arr[0] as TypeOfOrder[];
    this.ordersLength = arr[1] as number;
    this.pageIndex = arr[2] as number;
  }
  changePage(event: any) {
    let arr = this.filterService.changePage(event);
    this.orders = arr[0] as TypeOfOrder[];
    this.pageIndex = arr[1] as number;
  }
  ngOnDestroy() {
    this.filterSubj.unsubscribe();
    this.filterCongig.setDefault();
  }
}
