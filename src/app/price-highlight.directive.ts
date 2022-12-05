import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriceHighlight]',
})
export class PriceHighlightDirective implements OnInit {
  @Input() price: number;
  private elem = this.el.nativeElement;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.changeColor();
  }
  changeColor() {
    if (this.price > 500) {
      this.elem.style.color = 'red';
    }
    if (this.price > 1000) {
      this.elem.style.color = 'green';
    }
  }
}
