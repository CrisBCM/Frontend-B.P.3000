import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "./token.service";

export const AdminGuard:CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  let tokenDecoded = tokenService.tokenDecodedValue;

  if(tokenDecoded.role == "ADMIN"){
    return true;

  }else{
    router.navigate(["/bp-foro"])
    return false;
  }

  
}
