import { Component, OnInit } from '@angular/core'
import { InvestmentService } from '@ui-modules/investment/services/investment.service'
import { IInvestment } from '@shared/dto/investment.interfaces'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'

@Component({
  selector: 'app-root',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss'],
})
export class InvestmentComponent implements OnInit {
  data!: IInvestment
  investmentTotal: number = 0
  investmentTitle: string = 'Welcome'
  investmentDesc: string =
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form'
  investmentBtnName: string = 'See transactions'

  investmentData!: IInvestmentPreparedData
  investmentCategoryType!: string[]

  isLoading: boolean = true;

  constructor(private investmentService: InvestmentService) {}

  async ngOnInit(): Promise<void> {
    this.investmentData =
      await this.investmentService.getInvestmentPrepareData()
    this.investmentCategoryType =
      this.investmentService.prepareInvestmentCategoryType(this.investmentData)

    this.investmentTotal = this.investmentService.investmentServerData.total;

    this.isLoading = false
  }
}
