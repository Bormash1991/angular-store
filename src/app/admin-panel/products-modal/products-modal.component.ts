import { ProductsService } from './../../shop/products.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss'],
})
export class ProductsModalComponent {
  public keys: string[] = Object.keys(this.data.data);
  public className: string;
  public titleText: string;
  showLabel: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}
  form: FormGroup = this.fb.group({
    ...this.data.data,
  });

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.data.id) {
      this.titleText = 'Edit Product';
    } else {
      this.titleText = 'Add Product';
    }
  }
  showData() {
    let { name, price, description } = this.form.getRawValue();
    if (+price == 0) {
      this.showLabel = true;
    } else {
      if (this.titleText == 'Add Product') {
        this.productsService
          .create({
            name: name,
            price: +price,
            description: description,
          })
          .subscribe({
            next: (response) => {
              window.location.reload();
            },
            error: (error) => {},
          });
      } else {
        this.productsService
          .update(this.data.id, {
            name: name,
            price: +price,
            description: description,
          })
          .subscribe({
            next: (response) => {
              window.location.reload();
            },
            error: (error) => {},
          });
      }
      this.dialogRef.close();
    }
  }
}
