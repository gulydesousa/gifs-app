import { Component, Input, OnInit } from '@angular/core';
import { Gif } from "../../interfaces/gifs.interfaces";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class GifsCardComponent implements OnInit {

  @Input()
  public gif: Gif = {} as Gif;


  ngOnInit(): void {
    //Check if gif is not null
    if(!this.gif) throw new Error('Gif is required');
  }

  constructor() { }
}

