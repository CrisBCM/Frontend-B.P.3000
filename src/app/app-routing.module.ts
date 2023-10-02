import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BpPageComponent } from './componentes/bp-page/bp-page.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { authGuard } from './service/auth.guard';
import { LogedGuard } from './service/loged.guard';
import { ForoMainComponent } from './componentes/foro-main/foro-main.component';
import { FormPublicacionComponent } from './componentes/form-publicacion/form-publicacion.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';
import { BtnPaginacionComponent } from './componentes/btn-paginacion/btn-paginacion.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AdminInterfazComponent } from './componentes/admin-interfaz/admin-interfaz.component';
import { AdminGuard } from './service/admin.guard';

const routes: Routes = [
  { path: 'bp-foro', component:ForoMainComponent},
  { path: 'admin', component:AdminInterfazComponent, canActivate:[AdminGuard]},
  { path: 'bp-perfil/:nombreUsuario', component:BpPageComponent, canActivate:[authGuard]},
  { path: 'publicar', component:FormPublicacionComponent, canActivate:[authGuard]},
  { path: 'publicacion/:idPublicacion', component:PublicacionComponent},
  { path: 'registro', component:RegistroComponent},
  { path:'iniciar-sesion', component:LoginComponent, canActivate:[LogedGuard]},
  { path:'btn', component:BtnPaginacionComponent},
  { path:'', redirectTo:'bp-foro', pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
