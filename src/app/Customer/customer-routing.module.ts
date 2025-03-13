import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./Components/Dashboard/dashboard/dashboard.component";
import { DepositComponent } from "./Components/Deposit/deposit/deposit.component";
import { WithdrawComponent } from "./Components/Withdraw/withdraw/withdraw.component";
import { FundtransferComponent } from "./Components/fundTransfer/fundtransfer/fundtransfer.component";

const routes: Routes = [ 
   { path: 'customerdashboard', component: DashboardComponent }, 
   { path: 'deposit', component: DepositComponent }, 
   { path: 'withdraw', component: WithdrawComponent }, 
   { path: 'fundtransfer', component: FundtransferComponent }, 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }