import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { Comments } from 'src/app/models/TypeOfProduct.inteface';

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
    private usersService: UsersService
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
      }
    });
  }
  sendData() {
    const { text, stars } = this.form.getRawValue();
    const comment: Comments = {
      text,
      stars,
      userId: this.data.userId,
      username: this.data.userInf.name,
      date:      new Date()
        .toLocaleDateString('ua-Ua', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .replace('р.', '')
    };
    this.productsService
      .addComment(this.data.id, comment)
      .then(() => this.dialogRef.close());
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
