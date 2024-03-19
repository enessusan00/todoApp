import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRoute,
  Params,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
 

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const currentUser = localStorage.getItem('ROLE');
      if(currentUser)
      {
        const roles = route.data!['roles'] as Array<string>;
        if (this.authService.authenticated && roles.includes(currentUser)) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }
      else{
        this.router.navigate(['/auth']);
        return false;
      }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const currentUser = localStorage.getItem('ROLE');
      if(currentUser)
      {
        const roles = next.data!['roles'] as Array<string>;
        if (this.authService.authenticated && roles.includes(currentUser)) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }
      else{
        this.router.navigate(['/auth']);
        return false;
      }
  }

}
