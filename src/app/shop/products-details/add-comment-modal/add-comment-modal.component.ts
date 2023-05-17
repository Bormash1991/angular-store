import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { Comments } from 'src/app/models/TypeOfProduct.inteface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.scss'],
})
export class AddCommentModalComponent {
  private sub: Subscription;
  constructor(
    public dialogRef: MatDialogRef<AddCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
  form: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    stars: [0, Validators.required],
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
      }
    });
  }
  sendData() {
    const { text, stars } = this.form.getRawValue();
    if (!stars && !text) {
      this.snackBar.open('Форма заповнена неправильно', 'Закрити', {
        duration: 10000,
      });
      // this.dialogRef.close();
      return;
    }
    const comment: Comments = {
      text,
      stars,
      userId: this.data.userId,
      username: this.data.userInf.name,
      date: new Date()
        .toLocaleDateString('ua-Ua', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .replace('р.', ''),
    };
    this.productsService
      .addComment(this.data.id, comment)
      .then(() => this.dialogRef.close());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
