import { switchMap } from 'rxjs';
import { TypeOfProduct } from './../../models/TypeOfProduct.inteface';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  data: TypeOfProduct[] = [];
  totalSum: number;
  openOrder: boolean = false;
  username: string = '';
  phone: string = '';
  form: FormGroup;
  userId: string = '';
  constructor(
    private addCartItemService: AddCartItemService,
    public dialogRef: MatDialogRef<CartModalComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
    this.usersService
      .getUser()
      .pipe(
        switchMap((user) => {
          if (user) {
            this.userId = user.uid;
          }
          return this.usersService.getUserInf(user?.uid!);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.username = data.name;
          this.phone = data.number;
        }
        this.form = this.fb.group({
          name: [this.username, Validators.pattern(/^[a-zA-Z ]{1,20}$/)],
          phone: [this.phone, Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)],
          message: ['', Validators.pattern(/^[a-zA-Z ]{0,50}$/)],
        });
      });
  }

  changeCounter(elem: ['increment' | 'decrement', TypeOfProduct]) {
    this.addCartItemService.changeCounter(elem[0], elem[1]);
    this.changeData();
  }
  changeData() {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
  }
  delete(elem: TypeOfProduct) {
    this.addCartItemService.removeSetOfProduct(elem);
    this.changeData();
  }
  closeModal() {
    this.dialogRef.close();
  }
  openOrderMenu() {
    this.openOrder = true;
  }
  makeOrder() {
    const { phone, name, message } = this.form.getRawValue();
    const orderProducts = this.data.map((item) => ({
      quantity: item.counter,
      id: item.id,
      name: item.name,
      img: item.images[0],
    }));
    this.ordersService
      .setOrder({
        createdAt: `${
          new Date().getDate() < 10
            ? '0' + new Date().getDate()
            : new Date().getDate()
        }-${
          new Date().getMonth() + 1 < 10
            ? '0' + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1
        }-${new Date().getFullYear()}`,
        phone,
        name,
        message,
        products: orderProducts,
        userId: this.userId,
        totalSum: this.totalSum,
        status: 'На обробці',
      })
      .then(() => {
        this.dialogRef.close();
        this.addCartItemService.deleteAllData();
      });
  }
}
