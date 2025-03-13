import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';
import { User } from '../../Models/Users/user';
import { Transaction } from 'src/app/Customer/Models/Transaction/transaction';
import { LogDTO } from '../../Models/Logs/log-dto';

@Injectable({
  providedIn: 'root'
})
export class PostServicesService {

  constructor(private dbService: NgxIndexedDBService) {}

  addCustomer(customer: Customer): Observable<any> {
    return this.dbService.add('customers', customer);
  }


  addAccount(account: Account): Observable<any> {
    return this.dbService.add('accounts', account);
  }

  approveAccount(account: Account): Observable<any> {
    return this.dbService.update('accounts', account);
  }

  addUser(user : User ): Observable<any> {        
    console.log (user)
    return this.dbService.add('users',user)
  }

  debitAccount(account: Account): Observable<any> {
    return this.dbService.update('accounts', account);
  }

  addTransaction(transaction: Transaction ): Observable<any> {   
    return this.dbService.add('transactions', transaction);  
    
  }

  addLog( log: LogDTO ): Observable<any> {   
    return this.dbService.add('logs', log);  
    
  }

  

 
}
