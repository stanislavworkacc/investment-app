import { IInvestmentData } from '@shared/dto/investment.interfaces'

export interface IInvestmentPreparedData {
  [key: string]: IInvestmentData[]
}
