import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/shop/products.service';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'app-warning-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<WarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {}
  showData() {
    if (this.data.type == 'product') {
      this.productsService.delete(this.data.data.id).subscribe();
    } else {
      this.usersService.delete(this.data.data.id).subscribe();
    }
    this.dialogRef.close();
  }
}
