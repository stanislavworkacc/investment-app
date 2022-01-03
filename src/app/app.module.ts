import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InvestmentModule } from '@ui-modules/investment/investment.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, InvestmentModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
