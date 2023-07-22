import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginServiceService } from "./login-service.service";

export const authGuard:CanActivateFn = () =>{
  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  let usuarioActual:any;

  loginService.usuarioAutenticado.subscribe(usuario =>{
    usuarioActual = usuario;
    console.log("soy usuario actual en authguard " + JSON.stringify(usuarioActual));
  })

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