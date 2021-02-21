import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Test } from 'src/app/Tester/test.model';
import { TestService } from 'src/app/Tester/test.service';

@Component({
  selector: 'app-enter-test-id',
  templateUrl: './enter-test-id.component.html',
  styleUrls: ['./enter-test-id.component.css']
})

export class EnterTestIDComponent implements OnInit{
  tests: Test[] = [];
  private testsSub: Subscription;
  //this should be taking the username from tester home
  private testCentreOfficerUsername = "TCO";//Take out TCO and replce with attr. obtained from prev page

  constructor(public testService: TestService){}

  ngOnInit(){
    this.testService.getTesterTests(this.testCentreOfficerUsername);
    this.testsSub = this.testService.getTestsUpdateListener()
    .subscribe((tests: Test[]) => {
      this.tests = tests;
    });
  }

  onDelete(testId: string){
    this.testService.deleteTest(testId);
  }

  ngOnDestroy(){
    this.testsSub.unsubscribe();
  }

}
