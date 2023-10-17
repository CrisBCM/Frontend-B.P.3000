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
import { ComentarioFormComponent } from './componentes/comentario-form/comentario-form.component';
import { BotonLikeDislikeComponent } from './componentes/boton-like-dislike/boton-like-dislike.component';
import { AutenticacionInterceptor } from './shared/autenticacion.interceptor';
import { ConsumoMainComponent } from './componentes/bp-page/consumo-main/consumo-main.component';
import { PublicacionesMainComponent } from './componentes/bp-page/publicaciones-main/publicaciones-main.component';
import { ComentariosMainComponent } from './componentes/bp-page/comentarios-main/comentarios-main.component';
import { ModalEditarComponent } from './componentes/publicacion/modal-editar/modal-editar.component';
import { ComentariosComponent } from './componentes/publicacion/comentarios/comentarios.component';
import { RespuestasComponent } from './componentes/publicacion/respuestas/respuestas.component';
import { BtnEliminarComponent } from './componentes/btn-eliminar/btn-eliminar.component';
import { ModalEliminarComponent } from './componentes/modal-eliminar/modal-eliminar.component';
import { BtnGroupComponent } from './componentes/btn-group/btn-group.component';
import { FormEditarComentarioRespuestaComponent } from './componentes/form-editar-comentario-respuesta/form-editar-comentario-respuesta.component';
import { CargandoSpinnerComponent } from './componentes/cargando-spinner/cargando-spinner.component';
import { SpinnerInterceptor } from './shared/spinner.interceptor';
import { BtnPaginacionComponent } from './componentes/btn-paginacion/btn-paginacion.component';
import { PublicacionesGeneralComponent } from './componentes/foro-main/publicaciones-general/publicaciones-general.component';
import { FiltroDropdownComponent } from './componentes/filtro-dropdown/filtro-dropdown.component';
import { FiltroBusquedaComponent } from './componentes/filtro-busqueda/filtro-busqueda.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { AdminInterfazComponent } from './componentes/admin-interfaz/admin-interfaz.component';
import { AdminNavComponent } from './componentes/admin-interfaz/admin-nav/admin-nav.component';
import { AdminCategoriaComponent } from './componentes/admin-interfaz/admin-categoria/admin-categoria.component';
import { CategoriaBtnsComponent } from './componentes/admin-interfaz/admin-categoria/categoria-btns/categoria-btns.component';
import { CategoriaModalFormComponent } from './componentes/admin-interfaz/admin-categoria/categoria-modal-form/categoria-modal-form.component';
import { ForoIndiceComponent } from './componentes/foro-main/foro-indice/foro-indice.component';
import { FechaAntiguedadPipe } from './pipes/fecha-antiguedad.pipe';
import { PublicacionRecientePipe } from './pipes/publicacion-reciente.pipe';
import { ForoMainRoutingModule } from './componentes/foro-main/foro-main-routing/foro-main-routing.module';
import {ForoCategoria} from './componentes/foro-main/foro-categoria/foro-categoria.component';



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
    ComentarioFormComponent,
    BotonLikeDislikeComponent,
    ConsumoMainComponent,
    PublicacionesMainComponent,
    ComentariosMainComponent,
    ModalEditarComponent,
    ComentariosComponent,
    RespuestasComponent,
    BtnEliminarComponent,
    ModalEliminarComponent,
    BtnGroupComponent,
    FormEditarComentarioRespuestaComponent,
    CargandoSpinnerComponent,
    BtnPaginacionComponent,
    PublicacionesGeneralComponent,
    FiltroDropdownComponent,
    FiltroBusquedaComponent,
    CategoriaComponent,
    AdminInterfazComponent,
    AdminNavComponent,
    AdminCategoriaComponent,
    CategoriaBtnsComponent,
    CategoriaModalFormComponent,
    ForoIndiceComponent,
    FechaAntiguedadPipe,
    PublicacionRecientePipe,
    ForoCategoria
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ForoMainRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AutenticacionInterceptor, multi:true},
              {provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }