import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  constructor(private localStorageService: LocalStorageService) {}
  activePopup = false;
  activeBarclass = '';
  logout() {
    this.localStorageService.deleteData('authToken');
  }

  close() {
    this.activePopup = false;
  }
  showOrClosePopup() {
    if (!this.activePopup) {
      this.activePopup = true;
    } else {
      this.activePopup = false;
    }
  }
}
