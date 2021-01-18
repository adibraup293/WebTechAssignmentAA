import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manager-createTestCenter',
  templateUrl: './test-centre.component.html',
  styleUrls: ['./test-centre.component.css']
})

export class ManagerCreateTestCentre{
  onSaveTestCentre(form: NgForm){
    if (form.invalid){
      return;
    }

    form.resetForm();
  }
}
