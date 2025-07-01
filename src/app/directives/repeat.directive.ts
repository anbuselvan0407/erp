import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {}

  @Input() set appRepeat(times: number) {
    this.vcRef.clear(); // clear previous content
    for (let i = 0; i < times; i++) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}

