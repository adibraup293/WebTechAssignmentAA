import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TestCentre } from './testcentre.model';
import {TestCentreService} from './testcentre.service';

@Component({
  selector: 'app-manager-createTestCenter',
  templateUrl: './test-centre.component.html',
  styleUrls: ['./test-centre.component.css']
})

export class ManagerCreateTestCentre{
  testCentre: TestCentre;
  private mode = 'create';
  private testCentreId: string;

  constructor(public testCentreService: TestCentreService, public route: ActivatedRoute){}

  onSaveTestCentre(form: NgForm){
    if (form.invalid){
      return;
    }
    this.testCentreService.addTestCentre(form.value.testcentrename);
    form.resetForm();
  }
}
