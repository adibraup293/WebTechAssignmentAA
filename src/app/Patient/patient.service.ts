import {Patient} from './patient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class PatientService {
  private patients: Patient[] = [];
  private patientsUpdate = new Subject<Patient[]>();

  constructor(private http: HttpClient, private router: Router){}

  //fetching a single patient based on the id
  getPatient(id: string){
    //looking for test object in test array
    return{...this.patients.find(p => p.id === id)}; //check if test id is equal to id parameter
  }

  //fetching all the patients available in the patient collection
  getPatients(){
    this.http.get<{message: string, patients: any}>('http://localhost:3000/api/patients/')
    .pipe(map((patientData) => {
      return patientData.patients.map(test => {
        return {
          id: test._id,
          patientUsername : test.patientUsername,
          patientPassword : test.patientPassword,
          patientFullName : test.patientFullName,
          patientPosition : test.patientPosition
        };
      });
    }))
    .subscribe(transformedPatients => {
      this.patients = transformedPatients;
      this.patientsUpdate.next([...this.patients]);
     })
  }

  //editing a patient object
  updatePatient(id: string, patientUsername: string, patientPassword: string, patientFullName: string,
    patientPosition: string){
    const patient: Patient = {id: id, patientUsername: patientUsername, patientPassword: patientPassword,
      patientFullName: patientFullName, patientPosition: patientPosition};
    this.http.put('http://localhost:3000/api/patients/' + id, patient)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/patient-home']);
      });
  }

  //adding a patient object into collection
  addPatient(patientUsername: string, patientPassword: string, patientFullName: string,
    patientPosition: string){
    const patient: Patient = {id: null, patientUsername: patientUsername, patientPassword: patientPassword,
      patientFullName: patientFullName, patientPosition: patientPosition};
    this.http
    .post<{message:string, testId: string}> ('http://localhost:3000/api/patients', patient)
    .subscribe((responseData) => {
      const id = responseData.testId;
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
