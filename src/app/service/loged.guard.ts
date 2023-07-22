import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

import { LoginServiceService } from './login-service.service';

export const LogedGuard:CanActivateFn = () => {
  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  let usuarioActual:any;

  loginService.usuarioAutenticado.subscribe(usuario =>{
    usuarioActual = usuario;
  })
  
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
