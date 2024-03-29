import { TypeOfOrder } from './../../../models/TypeOfOrder.interface';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersModalComponent } from 'src/app/admin-panel/orders-modal/orders-modal.component';
import { WarningModalComponent } from 'src/app/admin-panel/warning-modal/modal.component';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent {
  @Input() items: TypeOfOrder[];
  price: number = 0;
  constructor(public dialog: MatDialog) {}

  openEditDialog(item: any) {
    this.dialog.open(OrdersModalComponent, {
      data: {
        data: {
          name: item.name,
          phone: item.phone,
          status: item.status,
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
