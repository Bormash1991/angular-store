import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
interface FormField {
  name: string;
  type: string;
  label: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  public modalConfig: FormField[];
  public keys: string[] = Object.keys(this.data);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeOfProduct,
    private fb: FormBuilder
  ) {}
  form: FormGroup = this.fb.group({
    ...this.checkId(),
  });
  checkId() {
    if (this.keys.includes('id')) {
      this.className = 'warning';
      this.titleText = '';
      return;
    } else {
      this.className = 'editOrCreate';
      this.titleText = 'Edit Product';
      return this.data;
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {}
  showData() {
    console.log(this.form.getRawValue());
    this.dialogRef.close();
  }
}
