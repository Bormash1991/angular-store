import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs';
import { TypeOfOrder } from 'src/app/models/TypeOfOrder.interface';
import { FilterService } from 'src/app/shared/services/filter.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: TypeOfOrder[] = [];
  public ordersLength: number;
  public pageIndex: number = 0;
  constructor(
    private ordersService: OrdersService,
    private filterService: FilterService<TypeOfOrder>,
    private userService: UsersService,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Мої замовлення');
    this.userService
      .getUser()
      .pipe(
        switchMap((user) => this.ordersService.getOrdersByUserId(user?.uid!))
      )
      .subscribe((data) => {
        if (data) {
          this.orders = this.filterService.setData(data.reverse(), 5);
          this.ordersLength = data.length;
          this.pageIndex = 0;
        }
      });
  }
  changePage(event: any) {
    let { items, pageIndex } = this.filterService.changePage(event);
    this.orders = items;
    this.pageIndex = pageIndex;
  }
}
