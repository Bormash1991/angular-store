import { API_PATH } from './../../shared/services/base-http.service';
import { ProductsService } from './../../shop/products.service';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/TypeOfOrder.interface';
import { FilesService } from 'src/app/shared/services/files.service';

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
  path = API_PATH;
  showLabel: boolean = false;
  deleteImagesPath: string[] = [];
  images = [...this.data.images];
  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}
  form: FormGroup = this.fb.group({
    ...this.data.data,
    otherIds: this.fb.array([]),
  });
  get controls() {
    return (this.form.get('otherIds') as FormArray).controls;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.data.id) {
      this.titleText = 'Edit Product';
    } else {
      this.titleText = 'Add Product';
    }
    this.initProducts();
  }
  addLabel() {
    const products = this.form.get('otherIds') as FormArray;
    products.push(this.initProduct(''));
  }
  initProducts() {
    const products = this.form.get('otherIds') as FormArray;
    this.data.otherIds.forEach((item: Product) =>
      products.push(this.initProduct(item))
    );
  }
  initProduct(id: any): FormGroup {
    return this.fb.group({
      id: [id],
    });
  }
  upload(event: any) {
    [...event.target.files].forEach((item: File) => {
      this.formData.append('files', item, item.name);
    });
  }
  addToDeleteImages(id: string) {
    this.deleteImagesPath.push(id);

    this.images.forEach((item: string, i: number) => {
      if (item == id) {
        this.images.splice(i, 1);
      }
    });
  }
  showData() {
    let keys = Object.keys(this.form.getRawValue());
    let value = this.form.getRawValue();

    for (let item of keys) {
      if (item == 'otherIds') {
        const id = value.otherIds.map((item: any) => item.id);
        if (!value['otherIds'][0].id) {
          this.formData.append('otherIds', JSON.stringify([]));
        } else {
          this.formData.append('otherIds', JSON.stringify(id));
        }
        continue;
      }
      this.formData.append(`${item}`, value[item]);
    }

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
      this.formData.append('oldImages', JSON.stringify(this.images));
      this.formData.append(
        'deletedImages',
        JSON.stringify(this.deleteImagesPath)
      );
      this.productsService.update(this.data.id, this.formData).subscribe({
        next: (response) => {
          window.location.reload();
        },
        error: (error) => {},
      });
    }
    this.dialogRef.close();
  }
}
