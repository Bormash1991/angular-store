import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  text: string = 'Log In';
  activePopup: boolean = false;
  canShowAdmin = false;
  hover = 'show';
  ngOnInit(): void {
    // const username = this.authService.getdecodeToken().username;
    // if (username !== 'none') {
    //   this.text = `Hello, ${username}`;
    //    if (this.authService.getdecodeToken().role == 'ADMIN') {
    //      this.canShowAdmin = true;
    //    }
    // }
  }
  logOut() {
    this.localStorageService.deleteData('token');
    this.router.navigate(['/login']);
  }
  showPopupOrLogin(event: any) {
    // if (this.authService.getdecodeToken().username !== 'none') {
    //   if (this.activePopup == true) {
    //     this.activePopup = false;
    //     this.hover = '';
    //   } else {
    //     this.hover = 'hide';
    //     this.activePopup = true;
    //   }
    //   return;
    // } else if (event.target.className != 'footer__popup_link') {
    //   this.router.navigateByUrl('login');
    // }
  }
  popupClose() {
    this.activePopup = false;
    this.hover = '';
  }
  hideHover() {
    this.hover = 'hide';
  }
}
