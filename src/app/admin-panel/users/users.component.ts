import { TypeOfUser } from 'src/app/models/TypeOfUser.interface';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { UsersService } from 'src/app/shared/services/users.service';
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
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.dataSubj = this.usersService
      .getData<TypeOfUser[]>()
      .subscribe((data) => {
        if (data) {
          this.loading$.next(false);
          this.products = this.filterService.setData(data, 5);
          this.productsLength = data.length;
        }
      });
    this.filterSubj = this.filterCongig.configuration$.subscribe((elem) => {
      this.changeData(elem, 'createdAt');
      if (elem.sortAs) {
        this.sortData(elem);
      }
    });
    this.products = [];
  }

  changeData(elem: filterCongig, param: 'price' | 'createdAt') {
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
