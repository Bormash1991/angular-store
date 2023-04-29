import { ProductsService } from '../../shared/services/products.service';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomOption, QuillModules } from 'ngx-quill';
import { Product } from 'src/app/models/TypeOfOrder.interface';

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
  imgForUpd: string[] = [];
  files: File[] = [];
  img: (string | ArrayBuffer | null)[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}
  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],

      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ align: [] }],

      ['clean'],

      ['link'],
    ],
  };

  form: FormGroup = this.fb.group({
    ...this.data.data,
    description: this.data.description,
    otherIds: this.fb.array([]),
    characteristics: this.fb.array([]),
  });
  get controlsIds() {
    return (this.form.get('otherIds') as FormArray).controls;
  }
  get controlsChar() {
    return (this.form.get('characteristics') as FormArray).controls;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  deleteIdInput(i: number) {
    (this.form.get('otherIds') as FormArray).removeAt(i);
  }
  deleteCharInput(i: number) {
    (this.form.get('characteristics') as FormArray).removeAt(i);
  }
  ngOnInit() {
    if (this.data.id) {
      this.titleText = 'Edit Product';
    } else {
      this.titleText = 'Add Product';
    }
    this.initIds();
    this.initChars();
    this.img = [...this.data.images];
    this.imgForUpd = [...this.data.images];
  }
  addIdLabel() {
    const products = this.form.get('otherIds') as FormArray;
    products.push(this.initId(''));
  }
  // addCharLabel() {
  //   const products = this.form.get('characteristics') as FormArray;
  //   products.push(this.initChar(''));
  // }
  initChars() {
    const products = this.form.get('characteristics') as FormArray;
    this.data.characteristics.forEach((item: [string, string[]]) =>
      products.push(this.initCharsGroup(item))
    );
  }
  initCharsGroup(char: [string, string[]]): FormGroup {
    return this.fb.group({ title: char[0], chars: this.fb.array(char[1]) });
  }
  initChar(item: any) {
    return this.fb.group({
      char: '',
    });
  }
  initIds() {
    const products = this.form.get('otherIds') as FormArray;
    this.data.otherIds.forEach((item: { id: string }) =>
      products.push(this.initId(item))
    );
  }
  initId(id: any): FormGroup {
    return this.fb.group({ id: id });
  }
  upload(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (const file of files) {
        this.files.push(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.img.push(e.target.result);
        };
      }
    }
  }
  deleteImg(src: string | ArrayBuffer | null) {
    const imgIndex = this.img.indexOf(src);
    const imgUpdIndex = this.img.indexOf(src);
    this.img.splice(imgIndex, 1);
    this.files.splice(imgIndex - this.imgForUpd.length - 1, 1);
    if (imgUpdIndex) {
      this.imgForUpd.splice(imgUpdIndex, 1);
    }
  }
  transformIds(value: { id: string }[]) {
    const idsArr = [];
    for (const val of Object.values(value)) {
      idsArr.push(val.id);
    }
    return idsArr;
  }
  transformChar(value: { char: string }[]) {
    const idsArr = [];
    for (const val of Object.values(value)) {
      idsArr.push(val.char);
    }
    return idsArr;
  }
  showData() {
    let date = {
      ...this.form.getRawValue(),
      otherIds: this.transformIds(this.form.getRawValue().otherIds),
      characteristics: this.transformChar(
        this.form.getRawValue().characteristics
      ),
    };
    console.log(this.form.getRawValue());
    // if (this.titleText == 'Add Product') {
    //   this.productsService.setProduct(date, this.files);
    // } else {
    //   this.productsService.updateProduct(
    //     this.data.id,
    //     date,
    //     this.imgForUpd,
    //     this.files
    //   );
    // }
    this.dialogRef.close();
  }
}
