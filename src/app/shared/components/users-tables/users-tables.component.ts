import { TypeOfUser } from './../../../models/TypeOfUser.interface';
import { Component, Input } from '@angular/core';
import { WarningModalComponent } from '../../../admin-panel/warning-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersModalComponent } from 'src/app/admin-panel/users-modal/users-modal.component';
@Component({
  selector: 'app-users-tables',
  templateUrl: './users-tables.component.html',
  styleUrls: ['./users-tables.component.scss'],
})
export class UsersTablesComponent {
  @Input() items: TypeOfUser[];

  constructor(public dialog: MatDialog) {}

  openEditDialog(item: any) {
    this.dialog.open(UsersModalComponent, {
      data: {
        data: {
          password: item.password,
        },
        id: item.id,
      },
    });
  }
  openDeleteDialog(item: TypeOfUser) {
    this.dialog.open(WarningModalComponent, {
      data: { data: { id: item.id }, type: 'user' },
    });
  }
}
