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

  constructor(public dialog: MatDialog) {}

  openEditDialog(item: any) {
    this.dialog.open(ProductsModalComponent, {
      data: {
        data: {
          name: item.name,
          price: item.price,
          description: item.description,
          color: item.color,
          cssColor: item.cssColor,
          guarantee: item.guarantee,
        },
        id: item.id,
        images: item.images,
        otherIds: item.otherIds,
      },
    });
  }
  openDeleteDialog(item: TypeOfProduct) {
    this.dialog.open(WarningModalComponent, {
      data: { data: { id: item.id }, type: 'product' },
    });
  }
}
