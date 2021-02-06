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

  //add Test Centre Officer profile
  addTestCentreOfficer(testCentreOfficerName: string, testCentreOfficerUsername: string,testCentreOfficerPassword: string,
    testCentreOfficerPosition: string, testCentreId: string
    ){
    const testCentreOfficer: TestCentreOfficer = {id:null, testCentreOfficerName: testCentreOfficerName,
    testCentreUsername: testCentreOfficerUsername,
    testCentrePassword: testCentreOfficerPassword,
    testCentrePosition: testCentreOfficerPosition,
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



}
