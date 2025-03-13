import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Log } from 'src/app/Admin/Models/Logs/log';
import { LogDTO } from 'src/app/Admin/Models/Logs/log-dto';
import { User } from 'src/app/Admin/Models/Users/user';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { Customer } from 'src/app/Customer/Models/Customer/customer';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

 

  customers : Customer [] = []
  customer : Customer = new Customer("","","","","","","","","","")
  formerror : string = ""
  user : User = new User("","","")
  log : Log = new Log (0,"","","")
  logdto : LogDTO = new LogDTO ("","","")
  loggedInUser : User = new User("","","")
   private userSubscription: Subscription | undefined;

   constructor(private postservice: PostServicesService , 
    private getservice : GetServicesService , private authService : AuthService)  {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => {      
    this.loggedInUser  = user;  }); 
    this.loadCustomers()
    
  }

  onsubmit(form :any ): void { 
    this.user.email = this.customer.email
    this.user.password = this.customer.phone
    this.user.role = "customer"    
    
     this.postservice.addCustomer(this.customer).subscribe();

      this.postservice.addUser(this.user).subscribe()   

      this.logdto.activity = "Adding of Customer " + this.customer.firstName + " " +  this.customer.lastName
      this.logdto.date = this.getCurrentDateTime()
      this.logdto.performedBy = this.loggedInUser.email

      this.postservice.addLog(this.logdto).subscribe(
        (response) =>  {
          window.location.href = '/manageCustomers';       
        }     
      ); 





  }

  loadCustomers ():void {
    this.getservice.getAllCustomers().subscribe(
      (response) =>  {
        this.customers = response      
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
