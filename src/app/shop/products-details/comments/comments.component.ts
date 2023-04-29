import { BehaviorSubject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UpdateInfService } from '../shared/update-inf.service';
import { Comments, TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { FilterService } from 'src/app/shared/services/filter.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentModalComponent } from '../add-comment-modal/add-comment-modal.component';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  protected loading$ = new BehaviorSubject<boolean>(true);
  protected comments: Comments[];
  protected pageIndex: number = 0;
  protected commentsLength: number;
  protected limit: number = 5;
  private productId: string;
  constructor(
    private updateInfService: UpdateInfService,
    private filterService: FilterService<Comments>,
    public dialog: MatDialog,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.updateInfService.getData().subscribe((data: TypeOfProduct) => {
      if (data) {
        this.productId = data.id;
        this.loading$.next(false);
        this.comments = this.filterService.setData(
          data.comments.reverse(),
          this.limit
        );
        this.commentsLength = data.comments.length;
      }
    });
    this.usersService.getUser().subscribe((user) => console.log(user));
  }
  changePage(event: any) {
    let { items, pageIndex } = this.filterService.changePage(event);
    this.comments = items;
    this.pageIndex = pageIndex;
  }
  openModal() {
    this.dialog.open(AddCommentModalComponent, {
      data: this.productId,
    });
  }
  ngOnDestroy(): void {
    this.filterService.resetData();
  }
}
