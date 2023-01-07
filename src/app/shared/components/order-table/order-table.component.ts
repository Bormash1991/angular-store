import { TypeOfOrder } from './../../../models/TypeOfOrder.interface';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersModalComponent } from 'src/app/admin-panel/orders-modal/orders-modal.component';
import { UsersModalComponent } from 'src/app/admin-panel/users-modal/users-modal.component';
import { WarningModalComponent } from 'src/app/admin-panel/warning-modal/modal.component';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  @Input() items: TypeOfOrder[];
  constructor(public dialog: MatDialog) {}
  openEditDialog(item: any) {
    this.dialog.open(OrdersModalComponent, {
      data: {
        data: {
          name: item.name,
          phone: item.phone,
        },
        products: item.products,
        id: item.id,
      },
    });
  }
  openDeleteDialog(item: TypeOfOrder) {
    this.dialog.open(WarningModalComponent, {
      data: { data: { id: item.id }, type: 'order' },
    });
  }
}
