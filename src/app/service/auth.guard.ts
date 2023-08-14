import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginServiceService } from "./login-service.service";

export const authGuard:CanActivateFn = () =>{
  let usuario = localStorage.getItem("usuarioActual");

  let usuarioActual;

  if(usuario) usuarioActual = JSON.parse(usuario);
  const router = inject(Router);


  if(usuarioActual.token && usuarioActual)
  {
    return true;
  }
  else
  {
    router.navigate(["/iniciar-sesion"])
    return false;
  }
}