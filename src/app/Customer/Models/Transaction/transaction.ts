import { Account } from "../Account/account"

export class Transaction {
   
    transactionType : string 
    transactionDate : string 
    accountFrom : string
    accountFromOwner : string 
    accountToOwner : string 
    accountTo: string
    amountInvolved : number 

    constructor (
        
        transactionType : string ,
        transactionDate : string ,        
        amountInvolved : number ,
        accountFromOwner : string,
        accountToOwner : string,
        accountTo: string ,
        accountFrom : string 


    ) {
        this.accountFromOwner = accountFromOwner
        this.accountToOwner = accountToOwner
        this.transactionDate = transactionDate
        this.amountInvolved = amountInvolved
        
        this.transactionType = transactionType
        this.accountFrom = accountFrom
        this.accountTo = accountTo

    }
}
