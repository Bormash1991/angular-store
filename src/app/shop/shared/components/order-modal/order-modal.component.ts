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
import { Subscription } from 'rxjs';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
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
  checkInputs: boolean = false;
  form: FormGroup;
  sub: Subscription;
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
      name: [this.name, Validators.pattern(/^[a-zA-Z ]{1,20}$/)],
      phone: [this.phone, Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)],
      message: ['', Validators.pattern(/^[a-zA-Z ]{0,50}$/)],
    });

    this.sub = this.form.valueChanges.subscribe((value) => {
      if (value.name || value.phone) {
        this.checkInputs = false;
      }
    });
  }
  onCheckboxChange(value: MatCheckboxChange) {
    this.checked = value.checked;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  sendOrder() {
    let { name, phone } = this.form.getRawValue();
    if (!name || !phone) {
      this.checkInputs = true;
      return;
    }
    if (
      this.form.get('phone')?.invalid ||
      this.form.get('name')?.invalid ||
      this.form.get('message')?.invalid
    ) {
    } else {
      this.ordersService;
      // .create<TypeOfOrder>({
      //   ...this.form.getRawValue(),
      //   products: this.products,
      // })
      // .subscribe({
      //   next: () => {
      //     let { name, phone } = this.form.getRawValue();
      //     if (this.checked) {
      //       this.localStorageService.setData('name', name);
      //       this.localStorageService.setData('phone', phone);
      //     }
      //     this.dialog.open(ThanksModalComponent, {});
      //     this.addCartItemService.deleteAllData();
      //   },
      //   error: () => {},
      // });
      this.dialogRef.close();
    }
  }
}
