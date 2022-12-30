import { Component, Input } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    this.dialog.open(ModalComponent, {
      data: { name: item.name, price: item.price, description: '' },
    });
  }
  openDeleteDialog(item: TypeOfProduct) {
    this.dialog.open(ModalComponent, {
      data: { id: item.id },
    });
  }
}
