import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForoMainComponent } from '../foro-main.component';
import { PublicacionesGeneralComponent } from '../publicaciones-general/publicaciones-general.component';
import { ForoIndiceComponent } from '../foro-indice/foro-indice.component';

const routes:Routes = [
  { path: 'bp-foro', component:ForoMainComponent, children:[
    {path: 'general', component:PublicacionesGeneralComponent},
    {path: 'indice', component:ForoIndiceComponent}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ForoMainRoutingModule { }
