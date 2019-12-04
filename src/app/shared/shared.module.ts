import { NgModule } from '@angular/core';
import { InvestorAvatarComponent } from './components/investor-avatar/investor-avatar.component';
import { InvestorInfoComponent } from './components/investor-info/investor-info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InvestorAvatarComponent, InvestorInfoComponent],
  imports: [CommonModule],
  exports: [InvestorInfoComponent]
})
export class SharedModule { }
