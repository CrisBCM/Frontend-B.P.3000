import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BpPageComponent } from './componentes/bp-page/bp-page.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { authGuard } from './service/auth.guard';
import { LogedGuard } from './service/loged.guard';
import { BpForoComponent } from './componentes/bp-foro/bp-foro.component';

const routes: Routes = [
  { path: 'bp-foro', component:BpForoComponent},
  { path: 'bp-perfil', component:BpPageComponent, canActivate:[authGuard]},
  { path: 'registro', component:RegistroComponent},
  { path:'iniciar-sesion', component:LoginComponent, canActivate:[LogedGuard]},
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
