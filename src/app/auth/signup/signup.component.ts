import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth.services';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(public authService: AuthService){}

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.createUser(form.value.name, form.value.email, form.value.password);
  }
}
