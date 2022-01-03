import { Component, Input } from '@angular/core'

@Component({
  selector: 'investment-heading-card',
  templateUrl: './heading-card.component.html',
})
export class HeadingCardComponent {
  @Input('totalProps') total: number = 0
  @Input('titleProps') title: string = ''
  @Input('descriptionProps') description: string = ''
  @Input('btnNameProps') btnName: string = ''
}
