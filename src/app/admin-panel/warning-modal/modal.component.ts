import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/shop/products.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
@Component({
  selector: 'app-warning-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  public text: string;
  constructor(
    public dialogRef: MatDialogRef<WarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.text = this.data.type;
  }
  showData() {
    if (this.data.type == 'product') {
      this.productsService.delete(this.data.data.id).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {},
      });
    } else if (this.data.type == 'user') {
      this.usersService.delete(this.data.data.id).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {},
      });
    } else {
      this.ordersService.delete(this.data.data.id).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {},
      });
    }
    this.dialogRef.close();
  }
}
