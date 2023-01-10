import { TypeOfUser } from 'src/app/models/TypeOfUser.interface';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { CloseOrOpenBarService } from '../shared/services/close-or-open-bar.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public products: TypeOfUser[] = [];
  public loading$ = new BehaviorSubject<boolean>(true);
  private filterSubj: Subscription;
  private dataSubj: Subscription;
  public productsLength: number;
  public pageIndex: number = 0;
  constructor(
    private usersService: UsersService,
    private filterCongig: ConfigService,
    private filterService: FilterService<TypeOfUser>,
    private renderer: Renderer2,
    private closeOrOpenBarService: CloseOrOpenBarService
  ) {}

  ngOnInit() {
    this.dataSubj = this.usersService.getData<TypeOfUser[]>().subscribe({
      next: (data) => {
        if (data) {
          this.loading$.next(false);
          this.products = this.filterService.setData(data, 5);
          this.productsLength = data.length;
        }
      },
      error: (error) => {},
    });
    this.filterSubj = this.filterCongig.configuration$.subscribe((elem) => {
      this.changeData(elem, 'updatedAtUsers');
      if (elem.sortAs) {
        this.sortData(elem);
      }
    });
    this.products = [];
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
  changeData(
    elem: filterCongig,
    param: 'price' | 'updatedAtUsers' | 'updatedAtOrders'
  ) {
    let arr = this.filterService.changeData(elem, param);
    this.products = arr[0] as TypeOfUser[];
    this.productsLength = arr[1] as number;
    this.pageIndex = arr[2] as number;
  }
  sortData(elem: filterCongig) {
    this.products = this.filterService.sortData(elem) as [];
  }
  changePage(event: any) {
    let arr = this.filterService.changePage(event);
    this.products = arr[0] as TypeOfUser[];
    this.pageIndex = arr[1] as number;
  }
  ngOnDestroy() {
    this.filterSubj.unsubscribe();
    this.dataSubj.unsubscribe();
    this.filterCongig.setDefault();
  }
}
