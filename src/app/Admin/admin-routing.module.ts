import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCustomersComponent } from './Components/ManageCustomers/manage-customers/manage-customers.component';
import { ManageAccountsComponent } from './Components/ManageAccounts/manage-accounts/manage-accounts.component';
import { ViewTransactionsComponent } from './Components/Transactions/view-transactions/view-transactions.component';
import { ViewLogsComponent } from './Components/Logs/view-logs/view-logs.component';


const routes: Routes = [
 { path: 'manageCustomers', component: ManageCustomersComponent },   
 { path: 'manageAccounts', component: ManageAccountsComponent },  
 {path : 'manageTransactions' , component:ViewTransactionsComponent},
 {path : 'viewlogs' , component:ViewLogsComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
