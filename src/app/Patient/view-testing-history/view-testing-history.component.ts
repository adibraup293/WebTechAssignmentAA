import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Test} from 'src/app/Tester/test.model'
import {TestService} from 'src/app/Tester/test.service';

@Component({
  selector: 'app-view-testing-history',
  templateUrl: './view-testing-history.component.html',
  styleUrls: ['./view-testing-history.component.css']
})

export class ViewTestingHistoryComponent implements OnInit{
  tests: Test[] = [];
  private testSub: Subscription;

  //get patient's username from prev page
  patientUsername;

  constructor(public testService: TestService){}

  ngOnInit(){
    this.testService.getPatientTests(this.patientUsername);
    this.testSub = this.testService.getTestsUpdateListener()
    .subscribe((tests: Test[]) => {
      this.tests = tests;
    });
  }

  ngOnDestroy(){
    this.testSub.unsubscribe();
  }
}
