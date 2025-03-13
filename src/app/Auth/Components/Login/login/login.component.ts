import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Admin/Models/Users/user';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor( private authService : AuthService ,private postservice: PostServicesService,  private router: Router){} 

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  user : User = new User ("","","")
  role : string = ""

  async login() {
    const success = await this.authService.login(this.email, this.password);
    if (success) {
      this.user = this.authService.getCurrentUser()
      console.log(this.user)
      this.role = this.user.role

      if(this.role === "admin"){
        window.location.href = '/dashboard';
      }
      else {
        window.location.href = '/customerdashboard';

      }
      
    } else {
      this.errorMessage = 'Error. Contact your adminstrator for assistance ';
    }
  }
  }