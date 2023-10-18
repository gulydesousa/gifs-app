import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  ngOnInit(): void {
    if(!this.url) throw new Error('Url is required');
  }

  onLoad(){
    setTimeout(() => {
      this._show = true;
    }, 1000);

  }

  @Input()
  public url: string = '';

  @Input()
  public alt: string = '';

  public _show: boolean = false;
}

