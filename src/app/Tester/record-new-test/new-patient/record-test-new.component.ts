import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from 'src/app/Tester/test.service';
import { AuthData } from "src/app/auth/auth-data.model";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.services';
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
  user: AuthData;
  currentDate = new Date();
  private mode = 'create';
  //this should be taking the patient id from previous page
  private patientId = "";
  //this should be taking the username from tester home
  private testCentreOfficerUsername = "TCO";//Take out TCO and replce with attr. obtained from prev page
  isDisabled: boolean;
  ptUsername: string;
  showNewTitle: boolean;
  showExistingTitle: boolean;

  constructor(public authService: AuthService, public testService: TestService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('patientId')) {
        this.mode = 'edit';
        this.patientId = paramMap.get('patientId');
        this.user = this.authService.getPatient(this.patientId);
        this.isDisabled = true;
        this.ptUsername = this.user.name;
        this.showNewTitle = false;
        this.showExistingTitle = true;
      } else {
        this.mode = 'create';
        this.patientId = null;
        this.isDisabled = false;
        this.showNewTitle = true;
        this.showExistingTitle = false;
      }
    });
  }

  onSaveTest(form: NgForm){
    if (form.invalid){
      return;
    }
    else if (this.mode === 'create'){
      this.authService.createPatient(form.value.email, form.value.username, form.value.password,
        form.value.name, "", "Patient", "");
    }
    this.testService.addTest(this.currentDate, form.value.username, form.value.patientType,
      form.value.symptoms, "Pending", "", this.testCentreOfficerUsername);
    form.resetForm();
  }
}
