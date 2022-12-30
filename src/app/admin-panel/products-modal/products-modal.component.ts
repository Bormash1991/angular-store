import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss'],
})
export class ProductsModalComponent {
  public keys: string[] = Object.keys(this.data);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  form: FormGroup = this.fb.group({
    ...this.data,
  });

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {}
  showData() {
    console.log(this.form.getRawValue());
    this.dialogRef.close();
  }
}
