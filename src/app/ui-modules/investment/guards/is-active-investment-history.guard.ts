import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'

@Injectable()
export class IsActiveInvestmentHistory implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isCanActivate(route)
  }

  isCanActivate(route: ActivatedRouteSnapshot): boolean {
    if (!route.queryParams.tab) {
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}
