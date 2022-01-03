import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { filter, takeUntil } from 'rxjs/operators'
import { InvestmentService } from '@ui-modules/investment/services/investment.service'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'
import { IInvestmentData } from '@shared/dto/investment.interfaces'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-investment-type',
  templateUrl: './investment-type.component.html',
  styleUrls: ['investment-card.component.scss'],
})
export class InvestmentTypeComponent implements OnInit, OnDestroy {
  areTabsAvailable: boolean = true
  categoryTabsData!: string[]
  currentSelected!: IInvestmentData[]
  preparedInvestmentData!: IInvestmentPreparedData
  activeTab: number = 0
  destroy$: Subject<boolean> = new Subject<boolean>()

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private investmentService: InvestmentService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetch()
    this.initSubscription()

    this.isLoading = false;
  }

  async fetch(): Promise<void> {
    this.preparedInvestmentData =
      await this.investmentService.getInvestmentPrepareData()
    this.categoryTabsData =
      this.investmentService.prepareInvestmentCategoryType(
        this.preparedInvestmentData
      )
  }

  initSubscription(): void {
    this.route.queryParams
      .pipe(
        filter((params: Params) => params.tab),
        takeUntil(this.destroy$)
      )
      .subscribe((params: Params) => {
        this.isLoading = true;
        const { tab } = params
        const categoryTabs: string[] =
          this.investmentService.prepareInvestmentCategoryType(
            this.preparedInvestmentData
          )
        this.currentSelected = this.preparedInvestmentData[categoryTabs[tab]]
        this.activeTab = Number(tab)

        if (this.isNotFound(categoryTabs)) {
          this.notFoundRedirect()
        }

        this.isLoading = false;
      })
  }

  private isNotFound(categoryTabs: string[]): boolean {
    return categoryTabs.length <= this.activeTab
  }

  private notFoundRedirect(): void {
    this.router.navigate(['/not-found'])
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
