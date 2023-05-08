import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { SideBarService } from '../shared/services/side-bar.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ChangeCatalogueStateService } from 'src/app/shop/shared/services/change-catalogue-state.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  overlayClass: string = '';
  sidebarClass: string = '';
  isUserLogIn: boolean = false;
  @Input() value: boolean;
  constructor(
    private renderer: Renderer2,
    private sideBarService: SideBarService,
    private usersService: UsersService,
    private changeCatalogueStateService: ChangeCatalogueStateService
  ) {}
  ngOnInit(): void {
    this.sideBarService.getSidebarStatus().subscribe((data) => {
      if (data) {
        this.showMenu();
      }
    });
    this.usersService.getUser().subscribe((user) => {});
  }
  openCalatogue() {
    this.closeMenu();
    this.changeCatalogueStateService.setCatalogueState(true);
  }
  showMenu() {
    this.renderer.addClass(document.documentElement, 'scroll-block');
    this.overlayClass = 'showOverlay';
    setTimeout(() => {
      this.sidebarClass = 'showSidebar';
    }, 300);
  }
  checkClose(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.classList.contains('overlay')) {
      this.closeMenu();
    }
  }
  closeMenu() {
    this.sideBarService.setSidebarStatus(false);
    this.sidebarClass = '';
    setTimeout(() => {
      this.renderer.removeClass(document.documentElement, 'scroll-block');
      this.overlayClass = 'hideOverlay';
    }, 300);
  }
}
