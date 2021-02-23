import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './loginTester.component.html',
  styleUrls: ['./loginTester.component.css']
})

export class LoginTesterComponent {

  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  constructor(public authService: AuthService){}

  onLoginTester(form: NgForm) {
    if (form.invalid){
      return;
    }this.authService.loginM(form.value.username, form.value.password);
  }
}
