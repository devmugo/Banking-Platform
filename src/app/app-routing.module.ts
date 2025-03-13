import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { DashboardComponent } from './Admin/Components/Dashboard/dashboard/dashboard.component';
import { AdminRoutingModule } from './Admin/admin-routing.module';
import { FundtransferComponent } from './Customer/Components/fundTransfer/fundtransfer/fundtransfer.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'fundtransfer', component: FundtransferComponent },  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),AdminRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
