import { Injectable, OnDestroy } from '@angular/core'
import {Router} from "@angular/router";
import { ApiService } from '@shared/services/api.service'
import { Api } from '@shared/dto/api.constants'
import { IInvestment, IInvestmentData } from '@shared/dto/investment.interfaces'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Injectable()
export class InvestmentService implements OnDestroy {
  investmentTotal!: number;
  investmentPreparedData!: IInvestmentPreparedData

  public destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  private fetch(): Promise<IInvestmentData[]> {
    return new Promise((res) => {
      this.apiService
        .get<IInvestment>(Api.Links.mockMain)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({data, total}: IInvestment) => {
          this.investmentTotal = total;
          this.investmentPreparedData = this.prepareInvestmentsData(data)
          return res(data)
        })
    })
  }

  private prepareInvestmentsData(data: IInvestmentData[]): IInvestmentPreparedData {
    return data.reduce(
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

  private isInvestmentData(): boolean {
    return !!this.investmentPreparedData
  }

  prepareInvestmentCategoryType(
    investmentData: IInvestmentPreparedData
  ): string[] {
    return Object.keys(investmentData)
  }

  async getCategoryTab(): Promise<string[]> {
    const prepareInvestmentData = await this.getInvestmentPrepareData()

    return this.prepareInvestmentCategoryType(prepareInvestmentData);
  }

  async getInvestmentPrepareData(): Promise<IInvestmentPreparedData> {
    if (this.isInvestmentData()) {
      return this.investmentPreparedData
    }

    return this.saveAndGetInvestments();
  }

  getTotalInvestments(): number {
    return this.investmentTotal
  }

  async saveAndGetInvestments(): Promise<IInvestmentPreparedData> {
    await this.fetch()
    return this.investmentPreparedData
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  isNotFound(categoryTabs: string[], activeTab: number): boolean {
    return categoryTabs.length <= activeTab || activeTab === -1
  }

  notFoundRedirect(): void {
    this.router.navigate(['/not-found'])
  }
}
