import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TestCentre } from '../TestCentre/testcentre.model';
import { TestCentreService} from '../TestCentre/testcentre.service';
import { TestCentreOfficerService} from './testcentreofficer.service';

import {TestKit} from '../ManageTestKit/testKit.model'
import {TestKitsService} from '../ManageTestKit/testKit.service';

@Component({
  selector: 'app-manager-registerTestOfficer',
  templateUrl: './record-officer.component.html',
  styleUrls: ['./record-officer.component.css']
})

export class ManagerRecordTestOfficerComponent implements OnInit{
  testcentres: TestCentre[] = [];
  private testcentresSub: Subscription;

  constructor(public testcentresService: TestCentreService){}

  ngOnInit(){
    this.testcentresService.getTestCentres();
    this.testcentresSub = this.testcentresService.getTestCentresUpdateListener()
    .subscribe((testcentres: TestCentre[]) => {
      this.testcentres = testcentres;
    });
  }

  onCreateTCOProfile(form: NgForm){
    if (form.invalid){
      return;
    }
    //this.
  }

  ngOnDestroy(){
    this.testcentresSub.unsubscribe();
  }
}
