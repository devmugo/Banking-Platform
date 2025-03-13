import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/Admin/Models/Users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl : string = ""
  role : string = ""
  private user : any = null
  private loggedUser : any = null
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
 

  constructor(private dbService: NgxIndexedDBService, private router : Router) {
    this.currentUserSubject = new BehaviorSubject<User>( this.getCurrentUser()|| 'null');
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      await this.waitForDBReady(); // Ensure DB is initialized

      this.user = await firstValueFrom(this.dbService.getByKey('users', email));

      if (!this.user) {
        console.log('❌ User not found!');
        return false; // User does not exist
      }

      if (this.user.password !== password) {
        console.log('❌ Incorrect password!');
        return false; // Incorrect password
      }

      // ✅ Successful login
      this.loggedUser = this.user;
      localStorage.setItem('loggedUser', JSON.stringify(this.user)); // Store session
      console.log('✅ Login successful!', this.user);
      return true;
    } catch (error) {
      console.error('❌ Login Error:', error);
      return false;
    }
  }

  
  async checkAndCreateUser() {
    try {
      await this.waitForDBReady(); // Ensure DB is initialized

      // Check if an admin user already exists
      const user = await firstValueFrom(this.dbService.getByKey('users', 'admin@gmail.com'));

      if (!user) {
        // Create a default admin user
        const defaultUser = { email: 'admin@gmail.com', password: 'admin123', role: 'admin' };
        await firstValueFrom(this.dbService.add('users', defaultUser));
        
      } else {
        
      }
    } catch (error) {
      console.error('❌ IndexedDB Error:', error);
    }
  }

  // Wait to ensure IndexedDB is ready before performing operations
  async waitForDBReady(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve,500)); // Small delay for DB initialization
  }

  logout() {
    this.loggedUser = null;
    localStorage.removeItem('loggedUser');
    console.log('✅ User logged out.');
    this.router.navigate(['/login']);
  }
  getCurrentUser() {
    if (!this.loggedUser) {
      const storedUser = localStorage.getItem('loggedUser');
      this.loggedUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.loggedUser;
  }
}
