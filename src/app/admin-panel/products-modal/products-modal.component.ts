import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { ProductsService } from './../../shop/products.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
const defaultCongig = {
  name: '',
  author: 'bohdan',
  price: 0,
  description: '',
};
@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss'],
})
export class ProductsModalComponent {
  public keys: string[] = Object.keys(this.data.data);
  public className: string;
  public titleText: string;
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
    let checkValues = Object.values(this.data).filter((elem) => elem != '');
    if (checkValues.length) {
      this.titleText = 'Edit Product';
    } else {
      this.titleText = 'Add Product';
    }
  }
  showData() {
    let { name, price, description } = this.form.getRawValue();
    if (this.titleText == 'Add Product') {
      this.productsService
        .create({
          name: name,
          author: 'bohdan',
          price: +price,
          description: description,
        })
        .subscribe((response) => console.log(response));
    } else {
      this.productsService
        .update(this.data.id, { ...this.form.getRawValue(), author: 'bohdan' })
        .subscribe((response) => console.log(response));
    }
    this.dialogRef.close();
  }
}
