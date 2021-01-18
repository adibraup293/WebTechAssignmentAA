import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manager-registerTestOfficer',
  templateUrl: './record-officer.component.html',
  styleUrls: ['./record-officer.component.css']
})

export class ManagerRecordTestOfficerComponent {

  onCreateTCOProfile(form: NgForm){
    if (form.invalid){
      return;
    }
  }
}
