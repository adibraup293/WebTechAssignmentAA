import {TestCentre} from './testcentre.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestCentreService {
  private testCentres: TestCentre[] = [];
  private testCentresUpdate = new Subject<TestCentre[]>();

  constructor(private http: HttpClient, private router: Router){}

  // to fetch a testCentre
  getTestcentre(id: string){
    //fetch the object from test centres array
    return{...this.testCentres.find(p => p.id === id)}; //check if test centre id is equal to id parameter
  }

  // add test centre profile
  addTestCentre(testcentrename: string, testcentreaddress: string, testcentrecontact:number){
    const testCentre: TestCentre = {id: null, testcentrename: testcentrename, testcentreaddress:testcentreaddress, testcentrecontact:testcentrecontact};
    this.http
    .post<{message:string, testCentreId: string}> ('http://localhost:3000/api/testcentres', testCentre)
    .subscribe((responseData) => {
      const id = responseData.testCentreId;
      testCentre.id = id;
      console.log(responseData.message);
      this.testCentres.push(testCentre);
      this.testCentresUpdate.next([...this.testCentres]);
      this.router.navigate(['/manager-home']);
    });
  }

  // to retrieve the testCentre
  getTestCentres() {
    this.http.get<{message: string, testCentre: any}>('http://localhost:3000/api/testcentres/')
      .pipe(map((testCentreData) => {
        return testCentreData.testCentre.map(testCentre => {
          return {
            testcentrename: testCentre.testcentrename,
            id: testCentre._id
          };
        });
      }))
      .subscribe(transformedTestCentres => {
        this.testCentres = transformedTestCentres;
        this.testCentresUpdate.next([...this.testCentres]);
      })
  }

  getTestCentresUpdateListener(){
    return this.testCentresUpdate.asObservable();
  }
}
