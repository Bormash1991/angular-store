import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
<<<<<<< HEAD
  constructor(public dialog: MatDialog) {}
  openModal() {
    this.dialog.open(LoginComponent);
  }
=======
  constructor() {}
>>>>>>> additional
}
