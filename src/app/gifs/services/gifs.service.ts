import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const API_KEY = 'UM3TLSAv1Guk4K4zgoacvyGrJr9gs35O';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private httpClient: HttpClient) {
    this.getLocalStorage();

    //Si el historial no tiene tags, no se hace la petición HTTP
    if (this._tagsHistory.length > 0)
      this.searchTag(this.tagsHistory[0]);
  }


  private saveLocalStorage(): void {
    //localStorage: es un objeto que permite almacenar datos en el navegador web.
    //setItem(): permite almacenar un dato en el localStorage.
    //JSON.stringify(): convierte un objeto o valor de JavaScript en una cadena de texto JSON.
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private getLocalStorage(): void {
    //getItem(): permite obtener un dato del localStorage.
    //JSON.parse(): convierte una cadena de texto JSON en un objeto o valor de JavaScript.
    if (!localStorage.getItem('tagsHistory')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!) || [];
  }

  //By returning a copy of the array,
  //the method ensures that the original array is not modified when the history is accessed.
  //This is important because it prevents unintended changes to the history data
  //and ensures that the history remains consistent across the application.
  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  //Buscar el tag en el historial y borrarlo
  deleteTagHistory(tag: string): void {
    tag = tag.trim().toLocaleLowerCase();
    this._tagsHistory = this._tagsHistory.filter((tagHistory) => tagHistory !== tag);
    this.saveLocalStorage();
  }

  //insertar el tag en el inicio del historial
  insertTagHistory(tag: string): void {
    tag = tag.trim().toLocaleLowerCase();

    this.deleteTagHistory(tag);
    //Inserta el tag en el inicio del historial
    this._tagsHistory.unshift(tag);
    //Keep the history to a maximum of 10 last tags.
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    //Save the history in the local storage.
    this.saveLocalStorage();
  }

  searchTagHistory(tag: string = '') {
    if (tag.length === 0) return;

    this.deleteTagHistory(tag);
    this.insertTagHistory(tag);
  }

  //The searchTag() method receives a tag as a parameter and adds it to the history array.
  searchTag(tag: string = ''): void {
    this.searchTagHistory(tag);

    //Petición HTTP
    /*
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${tag}&limit=10`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data);
    });
    */

    const parameters = new HttpParams()
      .set('api_key', API_KEY)
      .set('q', tag)
      .set('limit', '10');

    //Observable: es una colección de valores que puede ser emitida de forma síncrona o asíncrona.
    //Petición HTTP con HttpClient
    this.httpClient.get<SearchResponse>(`${this._serviceUrl}/search`, { params: parameters })
      .subscribe((response) => { //Nos suscribimos para escuchar la respuesta
        this.gifList = response.data;
        console.log({ gifs: this.gifList });
      });

    console.log(this._tagsHistory);
  }
}


//!sdk key Giphy
//Lv45FjLE0vbfnY1YkvGiffusMLwPf2uN

//! api key Giphy
//UM3TLSAv1Guk4K4zgoacvyGrJr9gs35O
