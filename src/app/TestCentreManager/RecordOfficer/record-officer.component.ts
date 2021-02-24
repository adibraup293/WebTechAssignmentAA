import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TestCentre } from '../TestCentre/testcentre.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TestCentreOfficer } from './testcentreofficer.model';
import { AuthService } from '../../auth/auth.services';

import { TestCentreService} from '../TestCentre/testcentre.service';
import { TestCentreOfficerService} from './testcentreofficer.service';

@Component({
  selector: 'app-manager-registerTestOfficer',
  templateUrl: './record-officer.component.html',
  styleUrls: ['./record-officer.component.css']
})

export class ManagerRecordTestOfficerComponent implements OnInit{
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  testcentres: TestCentre[] = [];
  testCentreOfficer: TestCentreOfficer;
  officerPositions: string[] = ['Tester','Manager'];
  private testcentresSub: Subscription;

  constructor(public authService: AuthService, public testcentresService: TestCentreService, public testcentreOfficerService: TestCentreOfficerService){}

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
    this.authService.createTester(form.value.email,
      form.value.username,
      form.value.password,
      form.value.name,
      "Officer",
      "Tester",
      form.value.testCentreId);
    form.resetForm();
  }

  ngOnDestroy(){
    this.testcentresSub.unsubscribe();
  }
}
