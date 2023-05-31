import { ProductsService } from '../../shared/services/products.service';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomOption, QuillModules } from 'ngx-quill';
import { Product } from 'src/app/models/TypeOfOrder.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss'],
})
export class ProductsModalComponent {
  public keys: string[] = Object.keys(this.data.data);
  public className: string;
  public titleText: string;
  categories: { id?: string; name: string; link: string }[] = [];
  showLabel: boolean = false;
  imgForUpd: string[] = [];
  files: File[] = [];
  img: (string | ArrayBuffer | null)[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoryService
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
    category: this.data.category,
  });
  get controlsIds() {
    return (this.form.get('otherIds') as FormArray).controls;
  }
  get controlsChar() {
    return (this.form.get('characteristics') as FormArray).controls;
  }
  getCharacteristics(index: number) {
    return this.controlsChar[index].get('chars') as FormArray;
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
    this.data.characteristics.forEach((item: [string, string[]]) => {
      this.initChars(item);
    });
    this.img = [...this.data.images];
    this.imgForUpd = [...this.data.images];
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  createCharsGroup(): FormGroup {
    return this.fb.group({
      title: '',
      chars: this.fb.array([]),
    });
  }
  addCharGroup() {
    const chars = this.form.get('characteristics') as FormArray;
    chars.push(this.createCharsGroup());
  }
  addIdLabel() {
    const ids = this.form.get('otherIds') as FormArray;
    ids.push(this.initId(''));
  }

  deleteCharLabel(i: number, j: number) {
    const chars = this.form.get('characteristics') as FormArray;
    (chars.controls[i].get('chars') as FormArray).removeAt(j);
  }

  addCharLabel(i: number) {
    const chars = this.form.get('characteristics') as FormArray;
    (chars.controls[i].get('chars') as FormArray).push(this.initChar(''));
  }
  initChars(data: any) {
    const newFormGroup = this.createCharsGroup();
    const title = newFormGroup.get('title') as FormArray;
    title.patchValue(data.title);
    const chars = newFormGroup.get('chars') as FormArray;
    if (data.chars) {
      data.chars.forEach((item: string[]) => chars.push(this.initChar(item)));
    }
    const characteristics = this.form.get('characteristics') as FormArray;
    characteristics.push(newFormGroup);
  }

  initChar(item: any) {
    return this.fb.group({
      char: item,
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
    this.img.splice(imgIndex, 1);
    this.files.splice(imgIndex - this.imgForUpd.length - 1, 1);
    this.imgForUpd.splice(imgIndex, 1);
  }
  transformIds(value: { id: string }[]) {
    const idsArr = [];
    for (const val of Object.values(value)) {
      idsArr.push(val.id);
    }
    return idsArr;
  }
  transformChar(value: any[]) {
    return value.map((item) => {
      if (item.chars.length) {
        const chars = item.chars.map((char: any) => {
          return char.char;
        });
        return { title: item.title, chars };
      }
      return '';
    });
  }
  showData() {
    let date = {
      ...this.form.getRawValue(),
      otherIds: this.transformIds(this.form.getRawValue().otherIds),
      characteristics: this.transformChar(
        this.form.getRawValue().characteristics
      ),
    };

    if (this.titleText == 'Add Product') {
      this.productsService.setProduct(date, this.files);
    } else {
      this.productsService.updateProduct(
        this.data.id,
        date,
        this.imgForUpd,
        this.files
      );
    }
    this.dialogRef.close();
  }
}
