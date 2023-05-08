import { Directive, HostListener } from '@angular/core';
import { ChangeCatalogueStateService } from '../../shop/shared/services/change-catalogue-state.service';

@Directive({
  selector: '[appCloseCatalogue]',
})
export class CloseCatalogueDirective {
  constructor(
    private changeCatalogueStateService: ChangeCatalogueStateService
  ) {}
  @HostListener('click', ['$event']) onClick(event: Event) {
    this.changeCatalogueStateService.setCatalogueState(false);
  }
}
