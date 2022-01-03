import { Pipe, PipeTransform } from '@angular/core'
import { IInvestmentName } from '@shared/dto/investment.interfaces'

@Pipe({
  name: 'fullUserName',
})
export class FullUserName implements PipeTransform {
  transform(name: IInvestmentName): string {
    return this.getUserFullName(name)
  }

  private getUserFullName(name: IInvestmentName): string {
    return name.first + name.last
  }
}
