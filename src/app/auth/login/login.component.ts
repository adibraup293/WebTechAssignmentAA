import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(public authService: AuthService){}

  onLogin(form: NgForm) {
    if (form.invalid){
      return;
    }this.authService.loginManager(form.value.email, form.value.password);
  }
}
