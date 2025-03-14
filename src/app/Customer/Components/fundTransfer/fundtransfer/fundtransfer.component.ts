import { Component } from '@angular/core';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';
import { Transaction } from 'src/app/Customer/Models/Transaction/transaction';
import { CustomerService } from 'src/app/Customer/Services/Customer/customer.service';
import { Notification } from 'src/app/Customer/Models/Notifications/notification';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.css']
})
export class FundtransferComponent {
  debitHolder : Customer = new Customer("","","","","","","","","","")
  debitAccount : Account = new Account(this.debitHolder,"","",0,"","",false ,false)
  debitName : string = ""

  creditHolder : Customer = new Customer("","","","","","","","","","")
  creditAccount : Account = new Account(this.debitHolder,"","",0,"","",false ,false)
  accounts : Account[] = []
  currency : string = "KSHS"
  accountType : string = ""
  availablebalance : number = 0
  transferAmount : number = 0
  receiverbalance : number = 0
  debitAccountNo: string = ""
  accountnotfounderror = ""
  transactionerror = ""
  transaction : Transaction = new Transaction("","",0,"","","","",)
  notification : Notification = new Notification ("","",false)


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
      this.creditAccount = foundAccount
      this.currency = foundAccount.currency.toUpperCase()
      this.accountType = foundAccount.accountType.toUpperCase()
      this.availablebalance = foundAccount.accountBalance
    } else {
      console.log("Account not found");
    }

  }

  searchAccount(event : any){    
    console.log("in the search button ")
    this.getservice.getAccountById(this.debitAccountNo).subscribe(
      (response) =>  {
        this.debitAccount = response  
        if(!response){
          this.accountnotfounderror = "Account Not Found "  
        }
        else{
         this.debitAccount = response
         this.debitName = this.debitAccount.accountHolder.firstName 
         + " " + this.debitAccount.accountHolder.lastName      
         this.receiverbalance = this.debitAccount.accountBalance 

        }
             
      },
      (error) => {   
        this.accountnotfounderror = "Error  " 

      }
    ); 

  }

  onSubmit(form : any){
    this.creditAccount.accountBalance = this.availablebalance - this.transferAmount
    this.debitAccount.accountBalance = Number(this.receiverbalance) + Number(this.transferAmount)

    this.postservice.debitAccount(this.creditAccount).subscribe(
      (response) =>  {
         
        this.postservice.debitAccount(this.debitAccount).subscribe();            
      }
    );

    this.transaction.accountFrom = this.creditAccount.accountNumber
    this.transaction.accountFromOwner = this.creditAccount.accountHolder.firstName 
    + " " + this.creditAccount.accountHolder.lastName
    this.transaction.accountTo = this.debitAccount.accountNumber
    this.transaction.accountToOwner = this.debitAccount.accountHolder.firstName 
    + " " + this.debitAccount.accountHolder.lastName
    this.transaction.amountInvolved = this.transferAmount
    this.transaction.transactionDate = this.getCurrentDateTime()
    this.transaction.transactionType = "Fund Transfer"   

    this.notification.to = this.debitAccount.accountNumber
    this.notification.message = "Received sum of Kshs "  + this.transferAmount + " from " + this.creditAccount.accountNumber + "( "  + this.creditAccount.accountHolder.firstName + " " + 
    this.creditAccount.accountHolder.lastName + " )" 
    this.notification.read = false    

    this.postservice.addTransaction(this.transaction).subscribe()
    this.postservice.addNotification(this.notification).subscribe(
      (response) =>  {           
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
