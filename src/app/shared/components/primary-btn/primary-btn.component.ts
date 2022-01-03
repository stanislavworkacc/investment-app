import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

const REDIRECT_HOME: number = -1;

@Component({
  selector: 'shared-primary-btn',
  templateUrl: './primary-btn.component.html',
})
export class PrimaryBtnComponent {
  @Input('btnTextProps') btnText: string = ''
  @Input('btnLinkProps') btnLink: string = ''
  @Input('btnIdProps') btnId: number = 0

  constructor(private router: Router) {}

  onGoCategory(): void {
    const queryParams = this.btnId == REDIRECT_HOME ? {} : {queryParams: {tab: this.btnId}}
    this.router.navigate([this.btnLink], queryParams);
  }
}
