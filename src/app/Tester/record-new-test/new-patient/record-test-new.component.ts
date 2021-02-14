import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from "src/app/Tester/test.service";
import { Patient } from 'src/app/Patient/patient.model';
import { PatientService } from "src/app/Patient/patient.service";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-record-test-new',
  templateUrl: './record-test-new.component.html',
  styleUrls: ['./record-test-new.component.css']
})

export class RecordTestNewComponent{
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;
  togglePassword() {
    this.fieldTextType = !this.fieldTextType;
  }

  tests: Test;
  patients: Patient;
  currentDate = new Date();

  constructor(public testService: TestService, public patientService: PatientService) {}

  onSaveTest(form: NgForm){
    if (form.invalid){
      return;
    }
    this.patientService.addPatient(form.value.patientUsername, form.value.patientPassword,
        form.value.patientFullName, "Patient");
    this.testService.addTest(this.currentDate, form.value.patientUsername, form.value.patientType,
        form.value.symptoms, "Pending", "");
    form.resetForm();
  }
}
