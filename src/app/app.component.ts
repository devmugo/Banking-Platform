import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { User } from './Admin/Models/Users/user';
import { PostServicesService } from './Admin/Services/PostServices/post-services.service';
import { AuthService } from './Auth/Services/Auth/auth.service';
import { CustomerService } from './Customer/Services/Customer/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Digital_Banking_Platform';
  user : User = new User("","","")
  email : string = ""
  isAdmin : boolean = false
  isLoginPage = false;
  private userSubscription: Subscription | undefined;
  


  constructor(private router: Router , private postservice : PostServicesService, 
    private authService:AuthService , private custservice : CustomerService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.isLoginPage = this.router.url === '/login' || this.router.url === '/';
    });
  }  

  ngOnInit(): void {

    this.userSubscription = this.authService.currentUser.subscribe(user => {      
      this.user  = user;
      this.email = this.user.email
      if (this.user.role === "admin"){
        this.isAdmin = true
      }
    });    
    

  } 
    logout(): void {
      this.custservice.clearCustomer
      this.authService.logout();
    }
  
    
  }
    
  

