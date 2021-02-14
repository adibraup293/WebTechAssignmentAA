import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from "src/app/Tester/test.service";
import { Patient } from 'src/app/Patient/patient.model';
import { PatientService } from "src/app/Patient/patient.service";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-record-test-existing',
  templateUrl: './record-test-existing.component.html',
  styleUrls: ['./record-test-existing.component.css']
})

export class RecordTestExistingComponent implements OnInit{
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  fieldTextType: boolean;
  togglePassword() {
    this.fieldTextType = !this.fieldTextType;
  }

  test: Test;
  patient: Patient;
  private patientId: string;
  currentDate = new Date();

  constructor(public testsService: TestService, public patientsService: PatientService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patient.id = paramMap.get('patientId');
      this.patient = this.patientsService.getPatient(this.patientId);
    });
  }

  onSaveTestKit(form: NgForm){
    if (form.invalid){
      return;
    }
    this.testsService.addTest(this.currentDate, this.test.patientUsername, form.value.patientType,
      form.value.symptoms, "Pending", "");
    form.resetForm();
  }
}
