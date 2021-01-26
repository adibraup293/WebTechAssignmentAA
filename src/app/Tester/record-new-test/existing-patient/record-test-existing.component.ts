import { Component } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-record-test-existing',
  templateUrl: './record-test-existing.component.html',
  styleUrls: ['./record-test-existing.component.css']
})

export class RecordTestExistingComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
}
