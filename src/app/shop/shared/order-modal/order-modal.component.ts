import { TypeOfOrder } from './../../../models/TypeOfOrder.interface';
import { TypeOfProduct } from './../../../models/TypeOfProduct.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Product } from 'src/app/models/TypeOfOrder.interface';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ThanksModalComponent } from '../thanks-modal/thanks-modal.component';
@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  products: Product[] = [];
  checked: boolean = false;
  name: string = '';
  phone: string = '';
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
    private addCartItemService: AddCartItemService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    let storageName = this.localStorageService.getData<string>('name');
    let storagePhone = this.localStorageService.getData<string>('phone');
    if (typeof storageName == 'string') {
      this.name = storageName;
    }
    if (typeof storagePhone == 'string') {
      this.phone = storagePhone;
    }
    this.form = this.fb.group({
      name: [this.name, Validators.pattern(/^[a-zA-Z]{0,20}$/)],
      phone: [this.phone, Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)],
    });
    this.localStorageService
      .getData<TypeOfProduct[]>('CartDataCount')
      .forEach((elem: TypeOfProduct) =>
        this.products.push({
          quantity: elem.counter,
          id: elem.id,
          name: elem.name,
        })
      );
  }
  onCheckboxChange(value: MatCheckboxChange) {
    this.checked = value.checked;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  sendOrder() {
    if (this.form.get('phone')?.invalid || this.form.get('name')?.invalid) {
    } else {
      this.ordersService
        .create<TypeOfOrder>({
          ...this.form.getRawValue(),
          message: 'Sent in box',
          products: this.products,
        })
        .subscribe({
          next: () => {
            let { name, phone } = this.form.getRawValue();
            if (this.checked) {
              this.localStorageService.setData('name', name);
              this.localStorageService.setData('phone', phone);
            }
            this.dialog.open(ThanksModalComponent, {});
            this.addCartItemService.deleteAllData();
          },
          error: () => {},
        });
      this.dialogRef.close();
    }
  }
}
