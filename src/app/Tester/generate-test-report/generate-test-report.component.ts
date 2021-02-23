import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Test} from 'src/app/Tester/test.model'
import {TestService} from 'src/app/Tester/test.service';
@Component({
  selector: 'generate-test-report-tester',
  templateUrl: './generate-test-report.component.html',
  styleUrls: ['./generate-test-report.component.css']
})

export class GenerateTestReportComponent implements OnInit {
  tests: Test[] = [];
  private testSub: Subscription;
  isTesterHomeButtonVisible: boolean;
  isManagerHomeButtonVisible: boolean;

  //this should be taking the username from tester home
  officerUsername = "TCO";

  constructor(public testService: TestService, public route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('testerUsername')) {
        this.testService.getTesterTests(this.officerUsername);
        this.isTesterHomeButtonVisible = true;
        this.isManagerHomeButtonVisible = false;
      } else {
        this.testService.getTests();
        this.isTesterHomeButtonVisible = false;
        this.isManagerHomeButtonVisible = true;
      }
      this.testSub = this.testService.getTestsUpdateListener()
      .subscribe((tests: Test[]) => {
        this.tests = tests;
      });
    });
  }

  ngOnDestroy(){
    this.testSub.unsubscribe();
  }
}
