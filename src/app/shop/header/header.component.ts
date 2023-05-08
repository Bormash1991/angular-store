import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { SideBarService } from '../shared/services/side-bar.service';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';
import { ChangeCatalogueStateService } from 'src/app/shop/shared/services/change-catalogue-state.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  productsLenght: number;
  public className: string = 'hide';
  activeClass: string = '';
  showCatalogue: boolean = false;
  constructor(
    public dialog: MatDialog,
    private sideBarService: SideBarService,
    private addCartItemService: AddCartItemService,
    private changeCatalogueStateService: ChangeCatalogueStateService
  ) {}
  ngOnInit(): void {
    this.addCartItemService.productsSubj$.subscribe(
      (products) =>
        (this.productsLenght = products.reduce(
          (acc, item) => (acc += item.counter),
          0
        ))
    );
    this.changeCatalogueStateService.getCatalogueState().subscribe((value) => {
      this.showCatalogue = value;
    });
  }
  changeCatalogueState() {
    if (this.showCatalogue) {
      this.showCatalogue = false;
    } else {
      this.showCatalogue = true;
    }
    this.changeCatalogueStateService.setCatalogueState(this.showCatalogue);
  }
  openMenu() {
    this.sideBarService.setSidebarStatus(true);
  }
  openDialog() {
    this.dialog.open(CartModalComponent);
  }
}
