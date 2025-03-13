import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './Admin/admin.module';
import { LoginComponent } from './Auth/Components/Login/login/login.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { CustomerModule } from './Customer/customer.module';
import { AuthService } from './Auth/Services/Auth/auth.service';
import { FormsModule } from '@angular/forms';


const dbConfig: DBConfig = {
  name: 'LocalDB',
  version: 4,
  objectStoresMeta: [
    // Table: Customers
    {
      store: 'customers',
      storeConfig: { keyPath: 'nationalId', autoIncrement: false },
      storeSchema: [
        { name: 'firstName', keypath: 'firstName', options: { unique: false } },
        { name: 'lastName', keypath: 'lastName', options: { unique: false } },
        { name: 'gender', keypath: 'gender', options: { unique: false } },
        { name: 'dateOfBirth', keypath: 'dateOfBirth', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'phone', keypath: 'phone', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
        { name: 'nextOfKin', keypath: 'nextOfKin', options: { unique: false } },        
        { name: 'nextofkincontact', keypath: 'nextofkincontact', options: { unique: false } }

        
      ]
    }  
,
    // Table: Accounts
    {
      store: 'accounts',
      storeConfig: { keyPath: 'accountNumber', autoIncrement: false },
      storeSchema: [
        { name: 'accountHolder', keypath: 'accountHolder', options: { unique: false } }, 
        { name: 'accountType', keypath: 'accountType', options: { unique: false } },
        { name: 'accountBalance', keypath: 'accountBalance', options: { unique: false } },
        { name: 'currency', keypath: 'currency', options: { unique: false } },
        { name: 'dateOpened', keypath: 'dateOpened', options: { unique: false } },
        { name: 'active', keypath: 'active', options: { unique: false } },
        { name: 'approved', keypath: 'approved', options: { unique: false } }
      ]
    },

    {
      store: 'users',
      storeConfig: { keyPath: 'email', autoIncrement: false },
      storeSchema: [
        
        { name: 'password', keypath: 'password', options: { unique: false } },
        { name: 'role', keypath: 'role', options: { unique: false } },
        
      ]
    },
    {
      store: 'transactions',
      storeConfig: { keyPath: 'transactionId', autoIncrement: true },
      storeSchema: [
        { name: 'transactionType', keypath: 'transactionType', options: { unique: false } }, 
        { name: 'transactionDate', keypath: 'transactionDate', options: { unique: false } },
        { name: 'amountInvolved', keypath: 'amountInvolved', options: { unique: false } },
        { name: 'transactionType', keypath: 'transactionType', options: { unique: false } },
        { name: 'accountFrom', keypath: 'accountFrom', options: { unique: false } },
        { name: 'accountTo', keypath: 'accountTo', options: { unique: false } },
        
      ]
    },
    {
      store: 'logs',
      storeConfig: { keyPath: 'logId', autoIncrement: true },
      storeSchema: [
        { name: 'activity', keypath: 'activity', options: { unique: false } }, 
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'performedBy', keypath: 'performedBy', options: { unique: false } },
       
        
      ]
    },
    {
      store: 'notifications',
      storeConfig: { keyPath: 'notificationId', autoIncrement: true },
      storeSchema: [
        { name: 'to', keypath: 'to', options: { unique: false } }, 
        { name: 'message', keypath: 'message', options: { unique: false } },
        { name: 'read', keypath: 'read', options: { unique: false } },
        
       
        
      ]
    }


  ]
};

export function initApp(authService: AuthService) {
  return () => authService.checkAndCreateUser();
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    CustomerModule,FormsModule
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
