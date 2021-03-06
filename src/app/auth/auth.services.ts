import { Injectable} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthData } from './auth-data.model';
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
    this.http.get<{message: string, user: any}>('http://localhost:3000/api/user')
    .pipe(map((patientData) => {
      return patientData.user.map(user => {
        return {
          id: user._id,
          email : user.email,
          username : user.username,
          password : user.password,
          name : user.name,
          position : user.position,
          type : user.type,
          centreId : user.centreId
        };
      }).filter(user => user.position === "Patient");
    }))
    .subscribe(transformedPatients => {
      this.patients = transformedPatients;
      this.patientsUpdate.next([...this.patients]);
     })
  }

  //fetching a single patient based on the id
  getPatient(id: string){
    //looking for patient object in patient array
    return{...this.patients.find(p => p.id === id)}; //check if patient id is equal to id parameter
  }

  //fetching a single patient based on the email
  getPatientByEmail(email: string){
    //looking for patient object in patient array
    return{...this.patients.find(p => p.email === email)}; //check if patient email is equal to email parameter
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

  loginUniversal(email: string, password: string){
    const user: AuthData = {email:email, password:password, position, type};
    var position=user.position, type=user.type;
    this.http.post <{token: string}> ('http://localhost:3000/api/user/login', user)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      console.log(user);
      if(user.position == "Officer" && user.type == "Tester"){
        this.router.navigate(['/tester-home']);
      }
      else if (user.position == "Officer" && user.type == "Manager"){
        this.router.navigate(['/manager-home']);
      }
      else if(user.position == "Patient" && user.type == ""){
        this.router.navigate(['/patient-home']);
      }
    });
  }

  loginPatient(email: string, password: string){
    const user: AuthData = {email:email, password:password};
    const patientEmail = user.email;
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
