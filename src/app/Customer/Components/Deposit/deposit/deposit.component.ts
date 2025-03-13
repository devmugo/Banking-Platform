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
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{  
    customer : Customer = new Customer ('','','','','','','','','','')
    account : Account = new Account(this.customer,'','',0,'','',false,false)
    accounts : Account[] = []
    currency : string = "Kshs"
    accounttype : string =  ""
    accountNumber : string = ""
    amountDeposited: number = 0
    availablebalance : number = 0
    transaction : Transaction = new Transaction("","",0,"","","","",)

    constructor(private postservice : PostServicesService, private authService:AuthService ,
       private getservice : GetServicesService , private custservice : CustomerService) {}

  ngOnInit(): void {
    this.custservice.accounts$.subscribe((response) => {
      if (response) {
        this.accounts = response      
      }
    })

  }

  accountSelect(event : any ) {    
    const selectedId = event.target.value;
    const foundAccount = this.accounts.find(acc => acc.accountNumber === event.target.value)
    if (foundAccount) {
      this.account = foundAccount
      this.currency = foundAccount.currency.toUpperCase()
      this.accounttype = foundAccount.accountType.toUpperCase()
    } else {
      console.log("Account not found");
    }

  }

  onSubmit(form : any ){
    this.availablebalance = this.account.accountBalance
    this.account.accountBalance = Number(this.amountDeposited)   + Number(this.availablebalance )

    this.postservice.debitAccount(this.account).subscribe(
      (response) =>  {       
        
       
      },
      (error) => {   
        console.log(error)       
        
      }
    );

        this.transaction.accountFrom = 'NA'
        this.transaction.accountFromOwner = 'NA'
        this.transaction.accountTo = this.account.accountNumber
        this.transaction.accountToOwner = this.account.accountHolder.firstName 
        + " " + this.account.accountHolder.lastName
        this.transaction.amountInvolved = this.amountDeposited
        this.transaction.transactionDate = this.getCurrentDateTime()
        this.transaction.transactionType = "Deposit"       

        this.postservice.addTransaction(this.transaction).subscribe(
          (response) =>  {   
            console.log("Transaction Completed ")
            window.location.href = '/customerdashboard';             
        
          },
          (error) => {   
            console.log(error)  
          }
        );      

  }

  getCurrentDateTime(): string {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


}
