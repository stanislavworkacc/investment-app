import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'shared-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input('activeTabProps') activeTab: number = 0

  @Input() tabsData!: string[]

  constructor(private router: Router) {}

  tabHandler(tabIndex: number): void {
    this.router.navigate(['/navigator'], { queryParams: { tab: tabIndex } })

    this.activeTab = tabIndex
  }
}
