import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/Admin/Models/Logs/log';
import { GetServicesService } from 'src/app/Admin/Services/GetServices/get-services.service';
import { PostServicesService } from 'src/app/Admin/Services/PostServices/post-services.service';
import { AuthService } from 'src/app/Auth/Services/Auth/auth.service';
import { CustomerService } from 'src/app/Customer/Services/Customer/customer.service';

@Component({
  selector: 'app-view-logs',
  templateUrl: './view-logs.component.html',
  styleUrls: ['./view-logs.component.css']
})
export class ViewLogsComponent implements OnInit {

  logs : Log[] = []

   constructor(private postservice : PostServicesService, private authService:AuthService ,
           private getservice : GetServicesService , private custservice : CustomerService) {}

  ngOnInit(): void {
    this.loadLogs()
           }

  loadLogs ():void {
    this.getservice.getAllLogs().subscribe(
      (response) =>  {
        this.logs = response 
        this.logs = this.logs.reverse()                   
        
      },
      (error) => {          
        
      }
    );    
    
  }

}
