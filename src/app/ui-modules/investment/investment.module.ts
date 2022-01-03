import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '@shared/shared.module'
import { InvestmentComponent } from '@ui-modules/investment/investment.component'
import { InvestmentRoutingModule } from '@ui-modules/investment/investment.routing.module'
import { HeadingCardComponent } from '@ui-modules/investment/components/heading-card/heading-card.component'
import { SummaryCardComponent } from '@ui-modules/investment/components/summary-card/summary-card.component'
import { InvestmentTypeComponent } from './components/investment-type/investment-type.component'
import {InvestmentService} from "@ui-modules/investment/services/investment.service";
import {IsActiveInvestmentHistory} from "@ui-modules/investment/guards/is-active-investment-history.guard";

@NgModule({
  declarations: [
    InvestmentComponent,
    HeadingCardComponent,
    SummaryCardComponent,
    InvestmentTypeComponent,
  ],
  imports: [SharedModule, CommonModule, InvestmentRoutingModule],
  providers: [InvestmentService, IsActiveInvestmentHistory]
})
export class InvestmentModule {}
