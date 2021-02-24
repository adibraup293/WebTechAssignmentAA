import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthData } from "src/app/auth/auth-data.model";
import { AuthService } from 'src/app/auth/auth.services';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})

export class SelectPatientComponent implements OnInit{
  patients: AuthData[] = [];
  private patientsSub: Subscription;

  constructor(public authService: AuthService){}

  ngOnInit(){
    this.authService.getPatients();
    this.patientsSub = this.authService.getPatientsUpdateListener()
    .subscribe((patients: AuthData[]) => {
      this.patients = patients;
    });
  }

  ngOnDestroy(){
    this.patientsSub.unsubscribe();
  }

}
