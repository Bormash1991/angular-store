import { Component, OnInit, Renderer2 } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { CloseOrOpenBarService } from '../shared/services/close-or-open-bar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private closeOrOpenBarService: CloseOrOpenBarService,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}
  activePopup = false;
  activeBarclass = '';
  logout() {
    this.authService.logOut();
    this.closeBar();
  }
  ngOnInit() {
    this.closeOrOpenBarService.changingState$.subscribe((value) => {
      if (value) {
        this.activeBarclass = 'side-bar_active';
      } else {
        this.closeBar();
      }
    });
  }
  close() {
    this.activePopup = false;
  }
  closeBar() {
    this.activeBarclass = '';
    this.renderer.removeClass(document.documentElement, 'scroll-block');
  }
  showOrClosePopup() {
    if (!this.activePopup) {
      this.activePopup = true;
    } else {
      this.activePopup = false;
    }
  }
}
