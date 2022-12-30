import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public className: string = 'hide';
  constructor(private router: Router) {}
  change(name: string) {
    this.className = name;
  }
  hover(): void {
    this.className = 'show';
    if (this.router.url == '/products/cart') {
      this.className = 'hide';
    }
  }
  leave() {
    this.className = 'hide';
  }
  click() {
    if (this.router.url == '/products/cart') {
      this.className = 'hide';
    }
  }
}
