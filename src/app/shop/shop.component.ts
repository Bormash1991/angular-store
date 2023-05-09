import { Component, OnInit } from '@angular/core';
import { ChangeCatalogueStateService } from './shared/services/change-catalogue-state.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  overlayClass: string = '';
  constructor(
    private changeCatalogueStateService: ChangeCatalogueStateService,
  ) {}
  ngOnInit(): void {
    this.changeCatalogueStateService.getCatalogueState().subscribe((value) => {
      if (value) {
        this.overlayClass = 'showOverlay';
      } else {
        this.overlayClass = 'hideOverlay';
      }
    });

  }
}
