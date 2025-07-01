import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = 'yellow';
  constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.appHighlight);
  }
  
}
