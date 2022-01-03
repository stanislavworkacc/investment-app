export interface IInvestmentData {
  _id: string
  amount: string
  type: string
  name: IInvestmentName
  company: string
  email: string
  phone: string
  address: string
}

export interface IInvestmentName {
  first: string
  last: string
}

export interface IInvestment {
  total: number
  data: IInvestmentData[]
}
