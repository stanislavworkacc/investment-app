import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { filter, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { InvestmentService } from '@ui-modules/investment/services/investment.service'
import { IInvestmentPreparedData } from '@ui-modules/investment/dto/common-investment.interfaces'
import { IInvestmentData } from '@shared/dto/investment.interfaces'
import { isQueryParamNumber} from "@shared/utils/common-utils";

@Component({
  selector: 'app-investment-type',
  templateUrl: './investment-type.component.html',
  styleUrls: ['investment-card.component.scss'],
})
export class InvestmentTypeComponent implements OnInit, OnDestroy {
  areTabsAvailable: boolean = true
  categoryTabsData!: string[]
  selectedTabData!: IInvestmentData[]
  preparedInvestmentData!: IInvestmentPreparedData
  activeTab: number = -1
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
      await this.investmentService.getCategoryTab()
  }

  initSubscription(): void {
    this.route.queryParams
      .pipe(
        filter((params: Params) => params.tab),
        takeUntil(this.destroy$)
      )
      .subscribe(async (params: Params) => {
        this.isLoading = true;
        const categoryTabNames: string[] = await this.investmentService.getCategoryTab()

        this.changeTab(params, categoryTabNames)

        this.isLoading = false;
      })
  }

  private changeTab(params: Params, categoryTabNames: string[]): void {
    const { tab } = params
    const selectedTab = isQueryParamNumber(tab);
    this.activeTab = selectedTab;

    if (this.investmentService.isNotFound(categoryTabNames, this.activeTab)) {
      this.investmentService.notFoundRedirect()
    }

    this.selectedTabData = this.preparedInvestmentData[categoryTabNames[selectedTab]]
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
