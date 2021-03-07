import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';

//servicios
import { GifsService } from './services/gifs.service';



@NgModule({
  declarations: [GifsPageComponent, BusquedaComponent, ResultadosComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GifsPageComponent
  ]
})
export class GifsModule { }
