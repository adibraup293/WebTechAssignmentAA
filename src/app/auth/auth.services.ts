import { Injectable} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { TestCentreOfficer } from '../TestCentreManager/RecordOfficer/testcentreofficer.model';
import { Patient } from "../Patient/patient.model";
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable ({providedIn: 'root' })
export class AuthService {
  public token: string;
  private authStatusListener = new Subject<boolean>();
  private patients: AuthData[] = [];
  private patientsUpdate = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createTester(email: string, username: string, password: string, name: string,
    position:string, type:string, centreId: string){
    const user: AuthData = {id: null, email:email, username:username, password:password,
    name:name, position: position, type: type, centreId: centreId};
    this.http.post <{message: string, id: string}> ('http://localhost:3000/api/user/signup', user)
    .subscribe((responseData) =>{
      const id = responseData.id;
      user.id = id;
      console.log(responseData.message);
      this.router.navigate(['/manager-home']);
    });
  }

  createManager(email: string, password: string, position:string, type:string){
    const user: AuthData = {email: email, password: password, position:position, type: type};
    this.http.post ('http://localhost:3000/api/user/signup', user)
    .subscribe(response =>{
      console.log(response);
    });
  }

  createPatient(email: string, username: string, password: string, name: string,
    position:string, type:string, centreId: string){
      const user: AuthData = {id: null, email:email, username:username, password:password,
        name:name, position: position, type: type, centreId: centreId};
      this.http.post<{message:string, patientId: string}> ('http://localhost:3000/api/user/signup', user)
        .subscribe(responseData =>{
          const id = responseData.patientId;
          user.id = id;
          console.log(responseData.message);
        });
  }

  //fetching all the patients available in the user collection
  getPatients(){
    this.http.get<{message: string, patients: any}>('http://localhost:3000/api/patients')
    .pipe(map((patientData) => {
      return patientData.patients.map(patient => {
        return {
          id: patient._id,
          email : patient.email,
          username : patient.username,
          password : patient.password,
          name : patient.name,
          position : patient.position,
          type : patient.type,
          centreId : patient.centreId
        };
      }).filter(patient => patient.username === patient.username);
    }))
    .subscribe(transformedPatients => {
      this.patients = transformedPatients;
      this.patientsUpdate.next([...this.patients]);
     })
  }

  //fetching a single patient based on the id
  getPatient(id: string){
    //looking for test object in test array
    return{...this.patients.find(p => p.id === id)}; //check if test id is equal to id parameter
  }

  //updates the array
  getPatientsUpdateListener(){
    return this.patientsUpdate.asObservable();
  }

  loginTester(email: string, password: string){
    const user: AuthData = {email:email, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', user)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      this.router.navigate(['/tester-home']);
    });
  }

  loginManager(email: string, password: string){
    const user: AuthData = {email:email, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', user)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      this.router.navigate(['/manager-home']);
      // if(user.position == "Officer" && user.type == "Manager"){
      //   this.router.navigate(['/manager-home']);
      // }else if(user.position == "Officer" && user.type == "Tester"){
      //   this.router.navigate(['/tester-home']);
      // }
    });
  }

  loginPatient(email: string, password: string){
    const user: AuthData = {email:email, password:password};
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', user)
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
