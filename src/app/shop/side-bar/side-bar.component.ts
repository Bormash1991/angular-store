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
import { MatDialog } from '@angular/material/dialog';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import firebase from 'firebase/compat/app';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/models/decodedUser.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  overlayClass: string = '';
  sidebarClass: string = '';

  userInf: User | null;
  checkAdmin: boolean = false;
  @Input() value: boolean;
  constructor(
    private renderer: Renderer2,
    private sideBarService: SideBarService,
    private usersService: UsersService,
    private changeCatalogueStateService: ChangeCatalogueStateService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.sideBarService.getSidebarStatus().subscribe((data) => {
      if (data) {
        this.showMenu();
      }
    });
    this.usersService
      .getUser()
      .pipe(
        switchMap((user) => {
          return this.usersService.getUserInf(user?.uid!);
        })
      )
      .subscribe((data) => {
        this.userInf = data;
      });
    this.usersService.checkAdmin().subscribe((val) => {
      this.checkAdmin = val;
    });
  }
  openCalatogue() {
    this.closeMenu();
    this.changeCatalogueStateService.setCatalogueState(true);
  }
  openCartModal() {
    this.closeMenu();
    this.dialog.open(CartModalComponent);
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
  logOut() {
    this.closeMenu();
    this.authService.logOut();
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
