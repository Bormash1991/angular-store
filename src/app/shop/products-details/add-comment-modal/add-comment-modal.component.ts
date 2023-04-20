import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../products.service';
import { ErrorsObject } from 'src/app/models/errorMessages.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss'],
})
export class AddCommentModalComponent {
  private sub: Subscription;
  protected errorMessages: ErrorsObject = {};
  constructor(
    public dialogRef: MatDialogRef<AddCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}
  form: FormGroup = this.fb.group({
    text: '',
    stars: 0,
  });
  closeDialog() {
    this.dialogRef.close();
  }
  onClick(event: any): void {
    console.log(event);
  }
  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe((value) => {
      if (value.stars || value.text) {
        this.errorMessages = {};
      }
    });
  }
  sendData() {
    const data = this.form.getRawValue();
    console.log(data);
    this.productsService.update(this.id, data, 'comment/').subscribe({
      next: (data) => {
        window.location.reload();
      },
      error: (error) => {
        error.error.forEach((error: string) => {
          const name = error.split(' - ')[0],
            text = error.split(' - ')[1];
          this.errorMessages[name] = text;
        });
      },
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
