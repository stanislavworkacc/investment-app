import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrimaryBtnComponent } from '@shared/components/primary-btn/primary-btn.component'
import { TabsComponent } from './components/tabs/tabs.component'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FullUserName } from './pipes/user-name.pipe'
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component'

@NgModule({
  declarations: [
    PrimaryBtnComponent,
    TabsComponent,
    FullUserName,
    NotFoundComponent,
    LoaderComponent,
  ],
  exports: [PrimaryBtnComponent, TabsComponent, FullUserName, LoaderComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class SharedModule {}
