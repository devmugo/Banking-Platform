import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { ManageCustomersComponent } from './Components/ManageCustomers/manage-customers/manage-customers.component';
import { ManageAccountsComponent } from './Components/ManageAccounts/manage-accounts/manage-accounts.component';
import { ViewTransactionsComponent } from './Components/Transactions/view-transactions/view-transactions.component';
import { FormsModule } from '@angular/forms';
import { ViewLogsComponent } from './Components/Logs/view-logs/view-logs.component';




@NgModule({
  declarations: [ DashboardComponent, ManageCustomersComponent,
     ManageAccountsComponent, ViewTransactionsComponent, ViewLogsComponent, ], 
  
  imports: [
    CommonModule,AdminRoutingModule,FormsModule
  ]
})
export class AdminModule { }
