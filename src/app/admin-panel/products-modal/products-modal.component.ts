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
  private formData = new FormData();
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
  upload(event: any) {
    const file: File[] = [];
    [...event.target.files].forEach((item: File) => {
      this.formData.append('files', item, item.name);
    });

    // const images: any = [];
    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(files[i]);
    //   reader.onload = () => {
    //     images.push(reader.result);
    //   };
    // }
  }
  showData() {
    let keys = Object.keys(this.form.getRawValue());
    let value = this.form.getRawValue();

    keys.forEach((item) => {
      this.formData.append(`${item}`, value[item]);
    });

    if (this.titleText == 'Add Product') {
      this.productsService.create(this.formData).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.productsService
        .update(this.data.id, {
          // name: name,
          // price: +price,
          // description: description,
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
