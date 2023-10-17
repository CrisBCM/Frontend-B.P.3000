import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BpPageComponent } from './componentes/bp-page/bp-page.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { authGuard } from './service/auth.guard';
import { LogedGuard } from './service/loged.guard';
import { FormPublicacionComponent } from './componentes/form-publicacion/form-publicacion.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';
import { BtnPaginacionComponent } from './componentes/btn-paginacion/btn-paginacion.component';
import { AdminInterfazComponent } from './componentes/admin-interfaz/admin-interfaz.component';
import { AdminGuard } from './service/admin.guard';
import { AdminCategoriaComponent } from './componentes/admin-interfaz/admin-categoria/admin-categoria.component';

const routes: Routes = [
  { path: 'admin', component:AdminInterfazComponent, children:[
    {path:'categorias', component:AdminCategoriaComponent}
  ], canActivate:[AdminGuard]},
  { path: 'bp-perfil/:nombreUsuario', component:BpPageComponent, canActivate:[authGuard]},
  { path: 'publicar', component:FormPublicacionComponent, canActivate:[authGuard]},
  { path: 'publicacion/:idPublicacion', component:PublicacionComponent},
  { path: 'registro', component:RegistroComponent},
  { path:'iniciar-sesion', component:LoginComponent, canActivate:[LogedGuard]},
  { path:'btn', component:BtnPaginacionComponent},
  { path:'', redirectTo:'bp-foro/general', pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
