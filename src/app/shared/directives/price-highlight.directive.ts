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
    this.price > 500 && this.price < 1000
      ? (this.elem.style.color = 'red')
      : this.price < 500
      ? (this.elem.style.color = '')
      : (this.elem.style.color = 'green');
  }
}
