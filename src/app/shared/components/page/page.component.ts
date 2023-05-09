import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input() titleText: string;
  @Input() text: string;
  @Input() btnText: string;
  @Input() linkPath: string;
}
