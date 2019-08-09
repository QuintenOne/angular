import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[title]' })
export class TitleDirective implements OnInit {

  @Input('title') titleText: string;
  constructor(private ref: ElementRef) { }

  ngOnInit() {
    var element = this.ref.nativeElement
    element.textContent = this.titleText
    element.style.color = 'blue';
  }

}
