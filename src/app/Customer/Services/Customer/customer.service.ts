import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerAccounts = new BehaviorSubject<any>(this.getAccounts());
  accounts$ = this.customerAccounts.asObservable();

  constructor() { }

  setAccounts(accounts: any) {
    this.customerAccounts.next(accounts);
    localStorage.setItem("Accounts", JSON.stringify(accounts))
  }

  getAccounts(): any {
    const storedCustomer = localStorage.getItem('Accounts');     
    return storedCustomer ? JSON.parse(storedCustomer) : null;
  }

  clearCustomer() {
    this.customerAccounts.next(null);
    localStorage.removeItem('Accounts');
  }

  
}
