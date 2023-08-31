import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BpPageComponent } from './componentes/bp-page/bp-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PerfilSectionComponent } from './componentes/bp-page/perfil-section/perfil-section.component';
import { MainComponent } from './componentes/bp-page/main/main.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderMainComponent } from './componentes/header-main/header-main.component';
import { ForoMainComponent } from './componentes/foro-main/foro-main.component';
import { BtnPublicarComponent } from './componentes/btn-publicar/btn-publicar.component';
import { FormPublicacionComponent } from './componentes/form-publicacion/form-publicacion.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';
import { PublicacionFiltroPipe } from './pipes/publicacion-filtro.pipe';
import { ComentarioFormComponent } from './componentes/comentario-form/comentario-form.component';
import { BotonLikeDislikeComponent } from './componentes/boton-like-dislike/boton-like-dislike.component';
import { EliminarEditarComponent } from './componentes/eliminar-editar/eliminar-editar.component';
import { AutenticacionInterceptor } from './shared/autenticacion.interceptor';
import { ConsumoMainComponent } from './componentes/bp-page/consumo-main/consumo-main.component';
import { PublicacionesMainComponent } from './componentes/bp-page/publicaciones-main/publicaciones-main.component';
import { ComentariosMainComponent } from './componentes/bp-page/comentarios-main/comentarios-main.component';
import { ModalEditarComponent } from './componentes/publicacion/modal-editar/modal-editar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BpPageComponent,
    NavbarComponent,
    PerfilSectionComponent,
    MainComponent,
    MenuUsuarioComponent,
    FooterComponent,
    HeaderMainComponent,
    ForoMainComponent,
    BtnPublicarComponent,
    FormPublicacionComponent,
    PublicacionComponent,
    PublicacionFiltroPipe,
    ComentarioFormComponent,
    BotonLikeDislikeComponent,
    EliminarEditarComponent,
    ConsumoMainComponent,
    PublicacionesMainComponent,
    ComentariosMainComponent,
    ModalEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AutenticacionInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }