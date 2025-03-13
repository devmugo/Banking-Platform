import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Admin/Models/Users/user';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';
import { Transaction } from 'src/app/Customer/Models/Transaction/transaction';
import { CustomerService } from 'src/app/Customer/Services/Customer/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User = new User("","","")
  email : string = ""
  username : string = ""
  customer : Customer = new Customer("","","","","","","","","","")
  private userSubscription: Subscription | undefined;
  accounts : Account[] = []
  transactions: Transaction[] = []

   constructor(private postservice : PostServicesService, private authService:AuthService ,
     private getservice : GetServicesService , private custService : CustomerService) {}

  ngOnInit(): void {

    this.userSubscription = this.authService.currentUser.subscribe(user => {      
      this.user  = user;
      this.email = this.user.email       
      
    }); 

    this.getservice.getCustomerByEmail(this.email).subscribe(
      (response) =>  {        
        this.customer = response   
        this.username = this.customer.firstName + " " + this.customer.lastName            

        this.getservice.getAccountsByUser(this.customer).subscribe(
          (response) =>  {            
            this.accounts = response  
            this.custService.setAccounts(this.accounts)  

            this.getTransactions()
          }
        ); 
      },
      (error) => {          
        
      }
    ); 


    
    
  }

  getTransactions() {
    this.getservice.getTransactionsByAccount(this.accounts[0]).subscribe(
      (response) =>  {
        this.transactions = response
        
      }    
    );    
    
  }

}



