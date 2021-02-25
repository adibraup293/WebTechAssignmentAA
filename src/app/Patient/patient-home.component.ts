import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthData } from "src/app/auth/auth-data.model";
import { AuthService } from 'src/app/auth/auth.services';
@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})

export class PatientHomeComponent implements OnInit{

  user: AuthData;
  private patientEmail: string;
  patientUsername : string;

  constructor(public authService: AuthService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('patientEmail')) {
        this.patientEmail = paramMap.get('patientEmail');
        this.user = this.authService.getPatientByEmail(this.patientEmail);
        this.patientUsername = this.user.username;
        console.log(this.patientEmail);
        console.log(this.user);
        console.log(this.patientUsername);
      } else {
        this.patientUsername = "Patient";
      }
    });
  }

}
