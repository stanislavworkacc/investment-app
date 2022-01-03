import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InvestmentModule } from '@ui-modules/investment/investment.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, InvestmentModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
