import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { firstValueFrom, Observable } from 'rxjs';
import { Account } from 'src/app/Customer/Models/Account/account';
import { Customer } from 'src/app/Customer/Models/Customer/customer';
import { User } from '../../Models/Users/user';
import { Transaction } from 'src/app/Customer/Models/Transaction/transaction';
import { Log } from '../../Models/Logs/log';
import { Notification } from 'src/app/Customer/Models/Notifications/notification';

@Injectable({
  providedIn: 'root'
})
export class GetServicesService {
  customers : Customer[] = []
  customer : Customer = new Customer("","","","","","","","","","")

  constructor(private dbService: NgxIndexedDBService) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.dbService.getAll('customers');
  }

  getAllAccounts(): Observable<Account[]> {
    return this.dbService.getAll('accounts');
  }
  
  getCustomerById(id: string): Observable<Customer> {
    return this.dbService.getByKey('customers', id);
  }

  getCustomerByEmail(email : string ): Observable<Customer>{     
    return this.dbService.getByIndex('customers', 'email', email);
    } 
    
    getAccountsByUser(customer: Customer): Observable<any[]> {
      console.log(customer.nationalId)
      return new Observable((observer) => {
        this.dbService.getAll('accounts').subscribe({
          next: (accounts) => {
            // Filter accounts where account.user matches the given user
            const filteredAccounts = (accounts as Account[]).filter(acc => acc.accountHolder.nationalId === customer.nationalId);            observer.next(filteredAccounts);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
      });
    }

    getAccountById(id: string): Observable<Account> {
      console.log("in the servce ")
      console.log(id)
      return this.dbService.getByKey('accounts' ,id);
    }

    getAllTransactions(): Observable<Transaction[]> {
      return this.dbService.getAll('transactions');
    }

    getAllLogs(): Observable<Log[]> {
      return this.dbService.getAll('logs');
    }

    getTransactionsByAccount(account: Account ): Observable<any[]> {
      return new Observable((observer) => {
        this.dbService.getAll('transactions').subscribe({
          next: (transactions) => {
            // Filter transactions where transaction.account matches the given account
            const filteredTransactions = (transactions as Transaction[]).filter(transaction => transaction.accountFrom === account.accountNumber || transaction.accountTo === account.accountNumber);
            observer.next(filteredTransactions);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
      });
    }

    getNotificationsByAccount(account: Account ): Observable<any[]> {
      return new Observable((observer) => {
        this.dbService.getAll('notifications').subscribe({
          next: (notifications) => {
            // Filter transactions where transaction.account matches the given account
            const filterednotifications = (notifications as Notification[]).filter(notification => notification.to === account.accountNumber && notification.read === false );
            observer.next(filterednotifications);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
      });
    }

   
}
