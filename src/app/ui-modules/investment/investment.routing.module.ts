import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InvestmentComponent } from '@ui-modules/investment/investment.component'
import { InvestmentTypeComponent } from '@ui-modules/investment/components/investment-type/investment-type.component'
import { IsActiveInvestmentHistory } from '@ui-modules/investment/guards/is-active-investment-history.guard'
import { NotFoundComponent } from '@shared/components/not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    component: InvestmentComponent,
  },
  {
    path: 'navigator',
    component: InvestmentTypeComponent,
    canActivate: [IsActiveInvestmentHistory],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentRoutingModule {}
