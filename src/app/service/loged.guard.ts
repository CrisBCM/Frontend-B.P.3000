import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

import { LoginServiceService } from './login-service.service';

export const LogedGuard:CanActivateFn = () => {
  let usuario = localStorage.getItem("usuarioActual");

  let usuarioActual;

  if(usuario) usuarioActual = JSON.parse(usuario);

  const router = inject(Router);

  
  if(usuarioActual && usuarioActual.token)
  {
    console.log("ESTOY REDIRIGIENDO A FORO!");

    console.log(usuarioActual);
    router.navigate(["/bp-foro"])
    return false;
  }
  else
  {
    return true;
  }
}
