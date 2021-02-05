import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TestCentre } from '../TestCentre/testcentre.model';
import { TestCentreService} from '../TestCentre/testcentre.service';

@Component({
  selector: 'app-manager-registerTestOfficer',
  templateUrl: './record-officer.component.html',
  styleUrls: ['./record-officer.component.css']
})

export class ManagerRecordTestOfficerComponent implements OnInit{

  testcentres:  TestCentre[]=[];
  private testCentresSub: Subscription;
  constructor(public testCentreService: TestCentreService){}

  ngOnInit(){
    this.testCentreService.getTestCentres
    this.testCentresSub = this.testCentreService.getTestCentresUpdateListener()
    .subscribe((testCentres: TestCentre[]) => {
      this.testcentres = testCentres;
    });
  }

  onCreateTCOProfile(form: NgForm){
    if (form.invalid){
      return;
    }
  }
}
