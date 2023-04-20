import { OrdersService } from './../../shared/services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/TypeOfOrder.interface';
@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss'],
})
export class OrdersModalComponent implements OnInit {
  form: FormGroup;
  public keys: string[] = Object.keys(this.data.data);
  public productKeys: string[] = Object.keys(this.data.products);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<OrdersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ordersService: OrdersService
  ) {}
  get controls() {
    return (this.form.get('products') as FormArray).controls;
  }
  ngOnInit() {
    this.form = this.fb.group({
      ...this.data.data,
      products: this.fb.array([]),
    });
    this.initProducts();
  }
  initProducts() {
    const products = this.form.get('products') as FormArray;
    this.data.products.forEach((item: Product) =>
      products.push(this.initProduct(item))
    );
  }
  initProduct(product: any): FormGroup {
    return this.fb.group({
      quantity: [product.quantity],
      id: [product.id],
      name: [product.name],
    });
  }  

  closeDialog() {
    this.dialogRef.close();
  }

  showData() {
    this.ordersService
      .update(this.data.id, { ...this.form.getRawValue() })
      .subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {},
      });
    this.dialogRef.close();
  }
}
