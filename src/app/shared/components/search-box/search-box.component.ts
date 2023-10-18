import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  public txtTagInput!: ElementRef<HTMLInputElement>;

  //!!Injeccion de dependencias
  constructor(private gifService:GifsService) {

  }

  searchTag() {
   const newTag = this.txtTagInput.nativeElement.value;
    console.log({newTag});
    this.gifService.searchTag(newTag);
    //Limpiar caja de texto
    this.txtTagInput.nativeElement.value = '';
  }
}
