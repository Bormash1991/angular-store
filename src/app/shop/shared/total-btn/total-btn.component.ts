import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-total-btn',
  templateUrl: './total-btn.component.html',
  styleUrls: ['./total-btn.component.scss'],
})
export class TotalBtnComponent {
  @Input() additianalClass: string = '';
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(OrderModalComponent, {});
  }
}
