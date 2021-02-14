import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/Patient/patient.model';
import { PatientService } from 'src/app/Patient/patient.service';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})

export class SelectPatientComponent implements OnInit{
  patients: Patient[] = [];
  private patientsSub: Subscription;

  constructor(public patientService: PatientService){}

  ngOnInit(){
    this.patientService.getPatients();
    this.patientsSub = this.patientService.getPatientsUpdateListener()
    .subscribe((patients: Patient[]) => {
      this.patients = patients;
    });
  }

  onDelete(patientId: string){
    this.patientService.deletePatient(patientId);
  }

  ngOnDestroy(){
    this.patientsSub.unsubscribe();
  }

}
