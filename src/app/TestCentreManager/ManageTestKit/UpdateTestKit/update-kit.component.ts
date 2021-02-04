import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {TestKit} from '../testKit.model'
import {TestKitsService} from '../testKit.service';

@Component({
  selector: 'app-update-test-kit',
  templateUrl: './update-kit.component.html',
  styleUrls: ['./update-kit.component.css']
})

export class UpdateTestKitComponent implements OnInit{
  testkits: TestKit[] = [];
  private testkitsSub: Subscription;

  constructor(public testkitsService: TestKitsService){}

  ngOnInit(){
    this.testkitsService.getTestkits();
    this.testkitsSub = this.testkitsService.getTestkitsUpdateListener()
    .subscribe((testkits: TestKit[]) => {
      this.testkits = testkits;
    });
  }

  onDelete(testkitId: string){
    this.testkitsService.deleteTestkit(testkitId);
  }
}
