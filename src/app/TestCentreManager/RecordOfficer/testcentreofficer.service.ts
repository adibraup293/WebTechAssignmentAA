import {TestCentreOfficer} from './testcentreofficer.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestCentreOfficerService{
  private testCentreOfficers: TestCentreOfficer[] = [];
  private testCentreOfficersUpdate = new Subject<TestCentreOfficer[]>();

  constructor(private http: HttpClient, private router: Router){}

  //to fetch testCentreOfficer
  getTestCentreOfficer(id: string){
    return{...this.testCentreOfficers.find(p => p.id === id)};
  }

  getTestcentreofficersUpdateListener(){
    return this.testCentreOfficersUpdate.asObservable();
  }

  //add Test Centre Officer profile
  addTestCentreOfficer(testCentreOfficerName: string, testCentreOfficerUsername: string,testCentreOfficerPassword: string,
    testCentreOfficerPosition: string, testCentreId: string
    ){
    const testCentreOfficer: TestCentreOfficer = {id:null, testCentreOfficerName: testCentreOfficerName,
    testCentreOfficerUsername: testCentreOfficerUsername,
    testCentreOfficerPassword: testCentreOfficerPassword,
    testCentreOfficerPosition: testCentreOfficerPosition,
    testCentreId: testCentreId};
    this.http.post<{message:string, testCentreOfficerId: string}> ('http://localhost:3000/api/testcentreofficers', testCentreOfficer)
    .subscribe((responseData) => {
      const id = responseData.testCentreOfficerId;
      testCentreOfficer.id = id;
      console.log(responseData.message);
      this.testCentreOfficers.push(testCentreOfficer);
      this.testCentreOfficersUpdate.next([...this.testCentreOfficers]);
      this.router.navigate(['/manager-home']);
    });
  }

  //get Test Centre Officer profile
  getTestCentreOfficers(){
    this.http.get<{message: string, testcentreofficers: any}>('http://localhost:3000/api/testcentreofficers/')
    .pipe(map((testerData) => {
      return testerData.testcentreofficers.map(tester => {
        return {
          testCentreOfficerName: tester.testCentreOfficerName,
          testCentreOfficerUsername: tester.testCentreOfficerUsername,
          testCentreOfficerPassword: tester.testCentreOfficerPassword,
          testCentreOfficerPosition: tester.testCentreOfficerPosition,
          testCentreId: tester.testCentreId,
          id: tester._id
        };
      });
    }))
    .subscribe(transformedTestCentreOfficers => {
      this.testCentreOfficers = transformedTestCentreOfficers;
      this.testCentreOfficersUpdate.next([...this.testCentreOfficers]);
     })
  }

  //delete Test Centre Officer profile
  deleteTestCentreOfficer(testCentreId: string){
    this.http.delete('http://localhost:3000/api/testcentreofficers/' + testCentreId)
    .subscribe(() => {
      const updatedTestCentreofficers = this.testCentreOfficers.filter(testCentreOfficer => testCentreOfficer.id !== testCentreId);
      this.testCentreOfficers = updatedTestCentreofficers;
      this.testCentreOfficersUpdate.next([...this.testCentreOfficers]);
      console.log('Successfully delete Testkit');
    });
  }
}
