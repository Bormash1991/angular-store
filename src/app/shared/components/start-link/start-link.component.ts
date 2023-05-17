import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-link',
  templateUrl: './start-link.component.html',
  styleUrls: ['./start-link.component.scss'],
})
export class StartLinkComponent {
  @Input() text: string;
}
