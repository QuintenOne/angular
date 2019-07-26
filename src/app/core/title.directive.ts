import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[title]' })
export class TitleDirective implements OnInit {

  @Input('title') titleText: string;
  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.ref.nativeElement.textContent = this.titleText
  }

}
