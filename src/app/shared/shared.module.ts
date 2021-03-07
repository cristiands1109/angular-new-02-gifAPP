import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// componentes
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule
  ],
  exports:[SidebarComponent]
})
export class SharedModule { }
