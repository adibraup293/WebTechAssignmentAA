import { Injectable} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { TestCentreOfficer } from '../TestCentreManager/RecordOfficer/testcentreofficer.model';
import { Patient } from "../Patient/patient.model";
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

  createUser(username: string, password: string){
    const authData: AuthData = {username:username, password: password};
    this.http.post ('http://localhost:3000/api/user/signup', authData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  createTester(testCentreOfficerName: string, testCentreOfficerUsername: string,testCentreOfficerPassword: string,
    testCentreOfficerPosition: string, testCentreId: string){
      const testCentreOfficer: TestCentreOfficer = {id:null, testCentreOfficerName: testCentreOfficerName,
        testCentreOfficerUsername: testCentreOfficerUsername,
        testCentreOfficerPassword: testCentreOfficerPassword,
        testCentreOfficerPosition: testCentreOfficerPosition,
        testCentreId: testCentreId};
        this.http.post<{message:string, testCentreOfficerId: string}> ('http://localhost:3000/api/testcentreofficers/signup',
          testCentreOfficer)
        .subscribe(responseData =>{
          const id = responseData.testCentreOfficerId;
          testCentreOfficer.id = id;
          console.log(responseData.message);
          this.router.navigate(['/login']);
        });
  }

  createPatient(patientUsername: string, patientPassword: string, patientFullName: string, patientPosition: string){
    const patient: Patient = {id: null, patientUsername: patientUsername, patientPassword: patientPassword,
      patientFullName: patientFullName, patientPosition: patientPosition};
      this.http.post<{message:string, patientId: string}> ('http://localhost:3000/api/patients/signup', patient)
        .subscribe(responseData =>{
          const id = responseData.patientId;
          patient.id = id;
          console.log(responseData.message);
        });
  }

  login(username: string, password: string){
    const authData: AuthData = {username:username, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      this.router.navigate(['/manager-home']);
    });
  }

  loginTester(username:string, password:string){
    const testcentreOfficer: TestCentreOfficer = {testCentreOfficerUsername:username, testCentreOfficerPassword:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/testcentreofficers/login', testcentreOfficer)
      .subscribe(response => {
        const token1 = response.token;
        this.token = token1;
        this.authStatusListener.next(true);
        this.router.navigate(['/tester-home']);
      });
  }

  loginPatient(username:string, password:string){
    const patient: Patient = {patientUsername:username, patientPassword:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/patients/login', patient)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
        this.router.navigate(['/patient-home']);
      });
  }

  logout(){
    this.token = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}
