import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gifs } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'CIYaSeHK6WxptsCkq0LWeca22hEnXrsM';
  private servicioURL: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string [] = [];

  // TODO: cambiar any por su tipo
  public resultados: Gifs [] = []

  get historial(){
   
    return [...this._historial];
  }

  constructor( private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    // if(localStorage.getItem('resultados')){
    //   this.resultados = JSON.parse(localStorage.getItem('resultados')!)
    // }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];  
  }

  buscarGifs(termino: string){

    // consultamos si es vacio para poder insetarlo
    // con trim lo que hacemos es eliminar los espacios para poder faciltar la consulta
    if(termino.trim().length === 0) {
      return;
    }

    // convertimos el termino de busqueda en minusculas para poder facilitar la consulta
    termino = termino.trim().toLocaleLowerCase();
    // consultamos si el historial incluye caracteres iguales en caso que no los incluya procedemos a incluir en el historial
    if(!this._historial.includes(termino)){
      this._historial.unshift(termino);
      // nos aseguramos que solo se almacenen 10 datos
      this._historial = this._historial.splice(0,10); 

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }



    const params = new HttpParams()
                       .set('api_key', this.apiKey)
                       .set('q', termino)
                       .set('limit', '10');
    // api.giphy.com/v1/gifs/search?api_key=CIYaSeHK6WxptsCkq0LWeca22hEnXrsM&q=dbz&limit=10
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
      .subscribe((resp) => {
        // console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      })

    
  }


}
