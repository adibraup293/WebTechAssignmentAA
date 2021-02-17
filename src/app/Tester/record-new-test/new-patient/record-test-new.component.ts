import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from 'src/app/Tester/test.service';
import { Patient } from 'src/app/Patient/patient.model';
import { PatientService } from 'src/app/Patient/patient.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-record-test-new',
  templateUrl: './record-test-new.component.html',
  styleUrls: ['./record-test-new.component.css']
})

export class RecordTestNewComponent implements OnInit{
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;
  togglePassword() {
    this.fieldTextType = !this.fieldTextType;
  }

  test: Test;
  patient: Patient;
  currentDate = new Date();
  private mode = 'create';
  //this should be taking the patient id from previous page
  private patientId: string;
  //this should be taking the username from tester home
  private testCentreOfficerUsername = "";

  constructor(public testService: TestService, public patientService: PatientService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('patientId')) {
        this.mode = 'edit';
        this.patientId = paramMap.get('patientId');
        this.test = this.testService.getTest(this.patientId);
      } else {
        this.mode = 'create';
        this.patientId = null;
      }
    });
  }

  onSaveTest(form: NgForm){
    if (form.invalid){
      return;
    }
    else if (this.mode === 'create'){
      this.patientService.addPatient(form.value.patientUsername, form.value.patientPassword,
        form.value.patientFullName, "Patient");
    }
    this.testService.addTest(this.currentDate, form.value.patientUsername, form.value.patientType,
      form.value.symptoms, "Pending", "", this.testCentreOfficerUsername);
    form.resetForm();
  }
}
