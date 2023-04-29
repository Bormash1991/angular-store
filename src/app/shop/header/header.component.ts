import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public className: string = 'hide';
  activeClass: string = '';
  constructor(private router: Router, private renderer: Renderer2) {}

  openMenu() {
    this.activeClass = 'header__nav_active';
    this.renderer.addClass(document.documentElement, 'scroll-block');
  }
  closeMenu() {
    this.activeClass = '';

    this.renderer.removeClass(document.documentElement, 'scroll-block');
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
