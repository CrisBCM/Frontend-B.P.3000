import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginServiceService } from "./login-service.service";

export const authGuard:CanActivateFn = () =>{
  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  let usuarioActual = loginService.usuarioAutenticado;

  if(usuarioActual && usuarioActual.token)
  {
    return true;
  }
  else
  {
    router.navigate(["/iniciar-sesion"])
    return false;
  }
}