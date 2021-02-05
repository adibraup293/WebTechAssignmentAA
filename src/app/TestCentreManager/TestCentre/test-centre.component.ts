import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestCentre } from './testcentre.model';
import {TestCentreService} from './testcentre.service';

@Component({
  selector: 'app-manager-createTestCenter',
  templateUrl: './test-centre.component.html',
  styleUrls: ['./test-centre.component.css']
})

export class ManagerCreateTestCentre implements OnInit{
  testCentre: TestCentre[] = [];
  public testCentreSub: Subscription;

  constructor(public testCentreService: TestCentreService, public route: ActivatedRoute){}

  onSaveTestCentre(form: NgForm){
    if (form.invalid){
      return;
    }
    this.testCentreService.addTestCentre(form.value.testcentrename, form.value.testcentreaddress, form.value.testcentrecontact);
    form.resetForm();
  }

  ngOnInit() {
    this.testCentreService.getTestCentres();
    this.testCentreSub = this.testCentreService.getTestCentresUpdateListener()
      .subscribe((testcentres: TestCentre[]) => {
        this.testCentre = testcentres;
      });
  }
}
