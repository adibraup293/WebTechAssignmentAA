import {TestKit} from './testKit.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestKitsService {
  private testkits: TestKit[] = [];
  private testkitsUpdated = new Subject<TestKit[]>();

  constructor(private http: HttpClient, private router: Router){}

  getTestkit(id: string){
    return{...this.testkits.find(p => p.id === id)};
  }

  updateTestkit(id: string, testkitname: string, testkitstock: number){
    const testkit: TestKit = {id: id, testkitname: testkitname, testkitstock: testkitstock};
    this.http.put('http://localhost:3000/api/testkits/' + id, testkit)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

   getTestkits(){
     this.http.get<{message: string, testkits: any}>('http://localhost:3000/api/testkits/')
     .pipe(map((testkitData) => {
       return testkitData.testkits.map(testkit => {
         return {
           testkitname : testkit.testkitname,
           testkitstock : testkit.testkitstock,
           id: testkit._id
         };
       });
     }))
     .subscribe(transformedTestkits => {
       this.testkits = transformedTestkits;
       this.testkitsUpdated.next([...this.testkits]);
     })
   }

   getTestkitsUpdateListener(){
     return this.testkitsUpdated.asObservable();
   }

  addTestkit(testkitname: string, testkitstock: number){
    const testkit: TestKit = {id: null, testkitname: testkitname, testkitstock: testkitstock};
    this.http.post<{message: string, testkitId: string}> ('http://localhost:3000/api/testkits/', testkit)
    .subscribe((responseData) => {
      const id = responseData.testkitId;
      testkit.id = id;
      console.log(responseData.message);
      this.testkits.push(testkit);
      this.testkitsUpdated.next([...this.testkits]);
      this.router.navigate(['/']);
    });
  }

  deleteTestkit(testkitId: string){
    this.http.delete('http://lolcalhost:3000/api/testkits/' + testkitId)
    .subscribe(() => {
      const updatedTestkits = this.testkits.filter(testkit => testkit.id !== testkitId);
      this.testkits = updatedTestkits;
      this.testkitsUpdated.next([...this.testkits]);
      console.log('Deleted');
    });
  }
}
