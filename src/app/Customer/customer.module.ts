import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { DepositComponent } from './Components/Deposit/deposit/deposit.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { WithdrawComponent } from './Components/Withdraw/withdraw/withdraw.component';
import { FundtransferComponent } from './Components/fundTransfer/fundtransfer/fundtransfer.component';




@NgModule({
  declarations: [ DepositComponent, DashboardComponent, WithdrawComponent, FundtransferComponent,

    
  ],
  imports: [
    CommonModule ,FormsModule , CustomerRoutingModule
  ]
})
export class CustomerModule { }
