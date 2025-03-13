import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';
import { Transaction } from 'src/app/Customer/Models/Transaction/transaction';
import { CustomerService } from 'src/app/Customer/Services/Customer/customer.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {
  transactions : Transaction[] = []
  customer : Customer = new Customer("Amos","Mwangi","male","24-05-1996","amos@gmail.com","0705521987","267-Kerugoya","Ann Mwangi","33187507","")
  account : Account = new Account(this.customer,"Savings" , "1173652116" ,2000,"Kshs","24-05-2020",false,true )
  account2 : Account = {} as Account

   constructor(private postservice : PostServicesService, private authService:AuthService ,
         private getservice : GetServicesService , private custservice : CustomerService) {}
  
  
  
  ngOnInit(): void {
    this.loadTransactions()
    
  }

  loadTransactions ():void {
    this.getservice.getAllTransactions().subscribe(
      (response) =>  {
        this.transactions = response  
        this.transactions = this.transactions.reverse()                  
        
      },
      (error) => {          
        
      }
    );    
    
  }

}
