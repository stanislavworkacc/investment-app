import { Component, OnInit } from '@angular/core'
import { InvestmentService } from '@ui-modules/investment/services/investment.service'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss'],
})
export class InvestmentComponent implements OnInit {
  investmentTitle: string = 'Welcome'
  investmentDesc: string =
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form'
  investmentBtnName: string = 'See transactions'

  investmentData!: IInvestmentPreparedData
  investmentCategoryType!: string[]
  investmentTotal: number = 0

  isLoading: boolean = true;

  constructor(private investmentService: InvestmentService) {}

  async ngOnInit(): Promise<void> {
    this.investmentData =
      await this.investmentService.getInvestmentPrepareData()
    this.investmentCategoryType =
      await this.investmentService.getCategoryTab()
    this.investmentTotal = this.investmentService.getTotalInvestments();

    this.isLoading = false
  }
}
