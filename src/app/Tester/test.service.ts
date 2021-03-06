import {Test} from './test.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestService {
  private tests: Test[] = [];
  private testsUpdate = new Subject<Test[]>();

  constructor(private http: HttpClient, private router: Router){}

  //fetching a single test based on the id
  getTest(id: string){
    //looking for test object in test array
    return{...this.tests.find(p => p.id === id)}; //check if test id is equal to id parameter
  }

  //fetching all the tests available in the test collection
  getTests(){
    this.http.get<{message: string, tests: any}>('http://localhost:3000/api/tests/')
    .pipe(map((testData) => {
      return testData.tests.map(test => {
        return {
          id: test._id,
          testDate : test.testDate,
          username : test.username,
          patientType : test.patientType,
          symptoms : test.symptoms,
          testStatus : test.testStatus,
          testResults : test.testResults,
          testCentreOfficerUsername: test.testCentreOfficerUsername
        };
      });
    }))
    .subscribe(transformedTests => {
      this.tests = transformedTests;
      this.testsUpdate.next([...this.tests]);
     })
  }

  //fetching all tests for only one patient
  getPatientTests(patientUsername:string){
    this.http.get<{message: string, tests: any}>('http://localhost:3000/api/tests/')
    .pipe(map((testData) => {
      return testData.tests.map(test => {
        return {
          id: test._id,
          testDate : test.testDate,
          username : test.username,
          patientType : test.patientType,
          symptoms : test.symptoms,
          testStatus : test.testStatus,
          testResults : test.testResults,
          testCentreOfficerUsername: test.testCentreOfficerUsername
        };
      }).filter(test => test.username === patientUsername);
    }))
    .subscribe(transformedTests => {
      this.tests = transformedTests;
      this.testsUpdate.next([...this.tests]);
     })
  }

  //fetching all tests for only one tester
  getTesterTests(testCentreOfficerUsername:string){
    this.http.get<{message: string, tests: any}>('http://localhost:3000/api/tests/')
    .pipe(map((testData) => {
      return testData.tests.map(test => {
        return {
          id: test._id,
          testDate : test.testDate,
          username : test.username,
          patientType : test.patientType,
          symptoms : test.symptoms,
          testStatus : test.testStatus,
          testResults : test.testResults,
          testCentreOfficerUsername: test.testCentreOfficerUsername
        };
      }).filter(test => test.testCentreOfficerUsername === testCentreOfficerUsername);
    }))
    .subscribe(transformedTests => {
      this.tests = transformedTests;
      this.testsUpdate.next([...this.tests]);
     })
  }

  //editing a test object
  updateTest(id: string, testDate: Date, username: string, patientType: string, symptoms: string,
    testStatus: string, testResults: string, testCentreOfficerUsername:string){
    const test: Test = {id: id, testDate: testDate, username: username, patientType: patientType,
      symptoms: symptoms, testStatus: testStatus, testResults: testResults,
      testCentreOfficerUsername: testCentreOfficerUsername};
    this.http.put('http://localhost:3000/api/tests/' + id, test)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/tester-home']);
      });
  }

  //adding a test object into collection
  addTest(testDate: Date, username: string, patientType: string, symptoms: string,
    testStatus: string, testResults: string, testCentreOfficerUsername:string){
    const test: Test = {id: null, testDate: testDate, username: username, patientType: patientType,
      symptoms: symptoms, testStatus: testStatus, testResults: testResults,
      testCentreOfficerUsername: testCentreOfficerUsername};
    this.http
    .post<{message:string, testId: string}> ('http://localhost:3000/api/tests', test)
    .subscribe((responseData) => {
      const id = responseData.testId;
      test.id = id;
      console.log(responseData.message);
      this.tests.push(test);
      this.testsUpdate.next([...this.tests]);
      this.router.navigate(['/tester-home']);
    });
  }

  //deleting a test object from collection
  deleteTest(testId: string){
    this.http.delete('http://localhost:3000/api/tests/' + testId)
    .subscribe(() => {
      const updatedTests = this.tests.filter(test => test.id !== testId);
      this.tests = updatedTests;
      this.testsUpdate.next([...this.tests]);
      console.log('Successfully deleted Test');
    });
  }

  //updates the array
  getTestsUpdateListener(){
    return this.testsUpdate.asObservable();
  }

}
