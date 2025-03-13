import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogDTO } from 'src/app/Admin/Models/Logs/log-dto';
import { User } from 'src/app/Admin/Models/Users/user';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {  



  customer : Customer = new Customer("","","","","","",""," ","" , "")
  account : Account = new Account(this.customer,"","",0,"","",true,false)
  accounts : Account [] = []
  idnumber : string = ""
  customername : string = ""
  accountNo : string = ''
  actype : string = ''
  currency : string = ""
  dateOpened : string = ''
  logdto : LogDTO = new LogDTO ("","","")
  loggedInUser : User = new User("","","")
  private userSubscription: Subscription | undefined;

   constructor(private postservice: PostServicesService , 
       private getservice : GetServicesService , private authService : AuthService)  {}

  

  ngOnInit(): void {    
    this.getAccounts()
    this.userSubscription = this.authService.currentUser.subscribe(user => {      
      this.loggedInUser  = user;  }); 
    
  }

  onSearch(){
    this.getservice.getCustomerById(this.idnumber).subscribe(
      (response) =>  {
        this.customer = response   
        this.customername = this.customer.firstName + " " + this.customer.lastName
                  
        
      },
      (error) => {   
        console.log(error)       
        
      }
    ); 
  }

  onSelectionChange(event : Event ){
    this.accountNo = this.generateAccountNumber(this.actype)
  }

  generateAccountNumber(type : string ): string {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 random digits
    if(type === "savings"){
    return `10${timestamp}${randomDigits}`;
    }
    else if (type === "current"){
      return `20${timestamp}${randomDigits}`;
    }
    else {
      return `30${timestamp}${randomDigits}`;

    }
  }

  onSubmit(form : any ){
    this.account.accountBalance = 0
    this.account.accountHolder = this.customer
    this.account.accountNumber = this.accountNo
    this.account.accountType = this.actype
    this.account.currency = this.currency
    this.account.approved = false 
    this.account.dateOpened  = this.dateOpened
    this.account.active = false 
   
    this.postservice.addAccount(this.account).subscribe();

    this.logdto.activity = "Adding of Account  Number   " + this.account.accountNumber + " belonging to customer " + this.customer.firstName + " " +  this.customer.lastName 
      this.logdto.date = this.getCurrentDateTime()
      this.logdto.performedBy = this.loggedInUser.email

      this.postservice.addLog(this.logdto).subscribe(
        (response) =>  {
          window.location.href = '/manageAccounts';       
        }     
      );
  }

  getAccounts(){
    this.getservice.getAllAccounts().subscribe(
      (response) =>  {
        this.accounts = response  
        this.accounts = this.accounts.sort((a, b) => b.dateOpened.localeCompare(a.dateOpened))                
        
      },
      (error) => {          
        
      }
    ); 
  }

  approveAccount(account : Account){
    account.approved = true
    account.active = true 
    this.postservice.approveAccount(account).subscribe();

    this.logdto.activity = "Approval of Account  Number   " + account.accountNumber + " belonging to customer " + account.accountHolder.firstName + " " +  account.accountHolder.lastName 
      this.logdto.date = this.getCurrentDateTime()
      this.logdto.performedBy = this.loggedInUser.email

      this.postservice.addLog(this.logdto).subscribe(
        (response) =>  {
          window.location.href = '/manageAccounts';       
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
