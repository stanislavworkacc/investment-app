import { Component, Input } from '@angular/core'
import { IInvestmentData } from '@shared/dto/investment.interfaces'

@Component({
  selector: 'investment-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent {
  btnText: string = 'See All'

  @Input('quantityProps') quantity: number = 0
  @Input('categoryProps') categoryTitle: string = ''
  @Input('investmentDataProps') investmentData!: IInvestmentData[]
  @Input('idProps') id: number = 0
}
