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
    // this.ordersService.getData<TypeOfOrder[]>().subscribe({
    //   next: (data) => {
    //     if (data) {
    //       this.loading$.next(false);
    //       this.orders = this.filterService.setData(data, 5);
    //       this.ordersLength = data.length;
    //     }
    //   },
    //   error: (error) => {},
    // });
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
    this.orders = this.filterService.sortData(elem);
  }
  changeData(
    elem: filterCongig,
    param: 'price' | 'updatedAtUsers' | 'updatedAtOrders'
  ) {
    let { items, itemsLength, pageIndex } = this.filterService.changeData(
      elem,
      param
    );
    this.orders = items;
    this.ordersLength = itemsLength;
    this.pageIndex = pageIndex;
  }
  changePage(event: any) {
    let { items, pageIndex } = this.filterService.changePage(event);
    this.orders = items;
    this.pageIndex = pageIndex;
  }
  ngOnDestroy() {
    this.filterSubj.unsubscribe();
    this.filterCongig.setDefault();
  }
}
