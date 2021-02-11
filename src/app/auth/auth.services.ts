import { Injectable} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { TestCentreOfficer } from '../TestCentreManager/RecordOfficer/testcentreofficer.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable ({providedIn: 'root' })
export class AuthService {
  public token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post ('http://localhost:3000/api/user/signup', authData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  login(email: string, password: string){
    const authData: AuthData = {email:email, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      this.router.navigate(['/manager-home']);
    });
  }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  loginTester(username:string, password:string){
    const testcentreOfficer: TestCentreOfficer = {testCentreOfficerUsername:username, testCentreOfficerPassword:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/testcentreofficers', testcentreOfficer)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
        this.router.navigate(['/tester-home']);
      });
  }
}
