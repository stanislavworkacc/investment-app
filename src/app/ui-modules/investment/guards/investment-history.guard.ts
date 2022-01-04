import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {isQueryParamNumber} from "@shared/utils/common-utils";
import {InvestmentService} from "@ui-modules/investment/services/investment.service";

@Injectable()
export class InvestmentHistoryGuard implements CanActivate {
  constructor(
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.isCanActivate(route)
  }

  async isCanActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const selectedTab = isQueryParamNumber(route.queryParams.tab);
    const categoryTabNames: string[] = await this.investmentService.getCategoryTab();

    if (this.investmentService.isNotFound(categoryTabNames, selectedTab)) {
      this.investmentService.notFoundRedirect()
      return false
    }
    return true
  }
}
