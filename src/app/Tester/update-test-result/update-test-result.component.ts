import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from "src/app/Tester/test.service";
@Component({
  selector: 'app-update-test-result',
  templateUrl: './update-test-result.component.html',
  styleUrls: ['./update-test-result.component.css']
})

export class UpdateTestResultComponent implements OnInit{

  test: Test;
  private testId = "";
  currentDate = new Date();

  constructor(public testsService: TestService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testId')) {
        this.testId = paramMap.get('testId');
        this.test = this.testsService.getTest(this.testId);
      } else {
        return;
      }
    });
  }

  onSaveTest(form: NgForm){
    if (form.invalid){
      return;
    }
    this.testsService.updateTest(this.testId, this.currentDate, this.test.patientUsername, this.test.patientType,
      form.value.symptoms, "Complete", form.value.testResults, this.test.testCentreOfficerUsername);
    form.resetForm();
  }

}

//Follow this link: https://stackoverflow.com/questions/28076773/input-value-not-visible-in-angularjs
//This will be useful for displaying data in the textfields later
