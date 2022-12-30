import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  public keys: string[] = Object.keys(this.data);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<WarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeOfProduct,
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
