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

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  data: TypeOfProduct[] = [];
  totalSum: number;
  openOrder: boolean = false;

  constructor(
    private addCartItemService: AddCartItemService,
    public dialogRef: MatDialogRef<CartModalComponent>,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
  }
  form: FormGroup = this.fb.group({
    name: ['', Validators.pattern(/^[a-zA-Z ]{1,20}$/)],
    phone: ['', Validators.pattern(/^\+\d{3}\d{3}\d{3}\d{3}$/)],
    message: ['', Validators.pattern(/^[a-zA-Z ]{0,50}$/)],
  });
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
}
