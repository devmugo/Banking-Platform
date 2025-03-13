import { Customer } from "../Customer/customer";

export class Account {
    accountHolder : Customer;
    accountType : string ;
    accountNumber : string;
    accountBalance : number ;
    currency : string ;
    dateOpened : string ;
    active : Boolean;
    approved : Boolean


    constructor(  accountHolder : Customer, accountType : string , accountNumber : string, accountBalance : number ,
          currency : string , dateOpened : string , active : Boolean , approved : Boolean) {
            this.accountBalance= accountBalance
            this.accountType = accountType
            this.accountNumber = accountNumber
            this.currency = currency
            this.dateOpened = dateOpened
            this.accountHolder = accountHolder
            this.active = active 
            this.approved = approved

          }

}
