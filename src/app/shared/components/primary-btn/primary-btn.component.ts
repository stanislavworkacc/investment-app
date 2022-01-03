import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

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
    this.router.navigate([this.btnLink], {
      queryParams: { tab: this.btnId },
    })
  }
}
