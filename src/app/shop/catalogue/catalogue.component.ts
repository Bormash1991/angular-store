import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ChangeCatalogueStateService } from 'src/app/shop/shared/services/change-catalogue-state.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  categories: any[];
  catalogueClass: string = '';
  @Input() static: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private changeCatalogueStateService: ChangeCatalogueStateService
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
    if (!this.static) {
      this.changeCatalogueStateService
        .getCatalogueState()
        .subscribe((value) => {
          if (value) {
            this.catalogueClass = 'showCatalogue';
          } else {
            this.catalogueClass = '';
          }
        });
    } else {
      this.catalogueClass = 'static';
    }
  }
}
