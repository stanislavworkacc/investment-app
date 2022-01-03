import { Injectable, OnDestroy } from '@angular/core'
import { ApiService } from '@shared/services/api.service'
import { Api } from '@shared/dto/api.constants'
import { IInvestment, IInvestmentData } from '@shared/dto/investment.interfaces'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Injectable()
export class InvestmentService implements OnDestroy {
  investmentServerData!: IInvestment
  investmentTypeData!: string[]
  investmentPreparedData!: IInvestmentPreparedData
  activeTab: number = 0

  public destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private apiService: ApiService) {}

  private fetch(): Promise<IInvestment> {
    return new Promise((res) => {
      this.apiService
        .get<IInvestment>(Api.Links.mockMain)
        .pipe(takeUntil(this.destroy$))
        .subscribe((investmentServerData: IInvestment) => {
          this.investmentServerData = investmentServerData
          this.prepareInvestmentsData(this.investmentServerData.data)
          return res(investmentServerData)
        })
    })
  }

  private prepareInvestmentsData(data: IInvestmentData[]): void {
    this.investmentPreparedData = data.reduce(
      (accum, item: IInvestmentData): IInvestmentPreparedData => {
        if (!Object.keys(accum).includes(item.type)) {
          accum[item.type] = [item]
          return accum
        }

        accum[item.type] = [...accum[item.type], item]
        return accum
      },
      {} as Record<string, IInvestmentData[]>
    )
  }

  async getInvestmentPrepareData(): Promise<IInvestmentPreparedData> {
    if (this.isInvestmentData()) {
      return this.investmentPreparedData
    }
    await this.fetch()
    return this.investmentPreparedData
  }

  private isInvestmentData(): IInvestmentPreparedData {
    return this.investmentServerData && this.investmentPreparedData
  }

  prepareInvestmentCategoryType(
    investmentData: IInvestmentPreparedData
  ): string[] {
    return Object.keys(investmentData)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
