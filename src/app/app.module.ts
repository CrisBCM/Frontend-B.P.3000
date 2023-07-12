import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BpPageComponent } from './componentes/bp-page/bp-page.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PerfilSectionComponent } from './componentes/perfil-section/perfil-section.component';
import { MainComponent } from './componentes/main/main.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderMainComponent } from './componentes/header-main/header-main.component';
import { BpForoComponent } from './componentes/bp-foro/bp-foro.component';
import { ForoMainComponent } from './componentes/foro-main/foro-main.component';

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
    BpForoComponent,
    ForoMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }