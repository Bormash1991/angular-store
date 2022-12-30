import { Component, Input } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { WarningModalComponent } from '../../../admin-panel/warning-modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from 'src/app/admin-panel/products-modal/products-modal.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent {
  @Input() items: TypeOfProduct[];
  @Input() params: 'name' | 'users';
  constructor(public dialog: MatDialog) {}

  openEditDialog(item: TypeOfProduct) {
    this.dialog.open(ProductsModalComponent, {
      data: { name: item.name, price: item.price, description: '' },
    });
  }
  openDeleteDialog(item: TypeOfProduct) {
    this.dialog.open(WarningModalComponent, {
      data: { id: item.id },
    });
  }
}
