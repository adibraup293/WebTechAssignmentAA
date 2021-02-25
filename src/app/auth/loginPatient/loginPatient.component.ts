import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './loginPatient.component.html',
  styleUrls: ['./loginPatient.component.css']
})

export class LoginPatientComponent {

  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(public authService: AuthService){}

  onLoginPatient(form: NgForm) {
    if (form.invalid){
      return;
    }this.authService.loginPatient(form.value.email, form.value.password);
  }
}
