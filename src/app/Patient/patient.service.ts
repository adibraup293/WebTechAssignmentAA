import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthData } from '../auth/auth-data.model';

@Injectable({providedIn: 'root'})

export class PatientService {
  private patients: AuthData[] = [];
  private patientsUpdate = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router){}

  //fetching a single patient based on the id
  getPatient(id: string){
    //looking for test object in test array
    return{...this.patients.find(p => p.id === id)}; //check if test id is equal to id parameter
  }

  //fetching all the patients available in the patient collection
  getPatients(){
    this.http.get<{message: string, patients: any}>('http://localhost:3000/api/user/')
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
      });
    }))
    .subscribe(transformedPatients => {
      this.patients = transformedPatients;
      this.patientsUpdate.next([...this.patients]);
     })
  }

  //editing a patient object
  updatePatient(id: string, patientEmail:string, patientUsername: string, patientPassword: string, patientFullName: string,
    patientPosition: string){
    const patient: AuthData = {id: id, email : patientEmail, username: patientUsername, password: patientPassword,
      name: patientFullName, position: patientPosition};
    this.http.put('http://localhost:3000/api/patients/' + id, patient)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/patient-home']);
      });
  }

  //adding a patient object into collection
  addPatient(patientEmail:string, patientUsername: string, patientPassword: string, patientFullName: string,
    patientPosition: string){
    const patient: AuthData = {id: null, email: patientEmail, username: patientUsername, password: patientPassword,
      name: patientFullName, position: patientPosition};
    this.http
    .post<{message:string, patientId: string}> ('http://localhost:3000/api/patients/signup', patient)
    .subscribe((responseData) => {
      const id = responseData.patientId;
      patient.id = id;
      console.log(responseData.message);
      this.patients.push(patient);
      this.patientsUpdate.next([...this.patients]);
    });
  }

  //deleting a patient object from collection
  deletePatient(patientId: string){
    this.http.delete('http://localhost:3000/api/patients/' + patientId)
    .subscribe(() => {
      const updatedPatients = this.patients.filter(patient => patient.id !== patientId);
      this.patients = updatedPatients;
      this.patientsUpdate.next([...this.patients]);
      console.log('Successfully deleted Patient');
    });
  }

  //updates the array
  getPatientsUpdateListener(){
    return this.patientsUpdate.asObservable();
  }

}
