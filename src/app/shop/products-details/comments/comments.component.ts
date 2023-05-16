import { BehaviorSubject, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateInfService } from '../shared/update-inf.service';
import { Comments, TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { FilterService } from 'src/app/shared/services/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentModalComponent } from '../add-comment-modal/add-comment-modal.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/models/decodedUser.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  protected loading$ = new BehaviorSubject<boolean>(true);
  protected comments: Comments[] = [];
  protected pageIndex: number = 0;
  protected commentsLength: number;
  protected limit: number = 5;
  protected userInf: User | null;
  private productId: string;
  protected userId: string | undefined;
  constructor(
    private updateInfService: UpdateInfService,
    private filterService: FilterService<Comments>,
    public dialog: MatDialog,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.updateInfService.getData().subscribe((data: TypeOfProduct) => {
      if (data) {
        this.filterService.resetData();
        this.productId = data.id;
        this.loading$.next(false);
        this.comments = this.filterService.setData(
          [...data.comments].reverse(),
          this.limit
        );
        this.commentsLength = data.comments.length;
      }
    });
    this.usersService
      .getUser()
      .pipe(
        switchMap((user) => {
          this.userId = user?.uid;
          return this.usersService.getUserInf(user?.uid!);
        })
      )
      .subscribe((user) => {
        this.userInf = user;
      });
  }
  changePage(event: any) {
    let { items, pageIndex } = this.filterService.changePage(event);
    this.comments = items;
    this.pageIndex = pageIndex;
  }
  deleteComment(id: string) {
    this.productsService.deleteComment(this.productId, id);
  }
  openModal() {
    this.dialog.open(AddCommentModalComponent, {
      data: { id: this.productId, userInf: this.userInf, userId: this.userId },
    });
  }
  ngOnDestroy(): void {
    this.filterService.resetData();
  }
}
