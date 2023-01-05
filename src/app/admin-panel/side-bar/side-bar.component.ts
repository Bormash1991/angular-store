import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  constructor(private localStorageService: LocalStorageService) {}
  activePopup = false;
  logout() {
    this.localStorageService.deleteData('authToken');
  }
  closePopup() {
    this.activePopup = false;
  }
  showPopup() {
    this.activePopup = true;
  }
}
