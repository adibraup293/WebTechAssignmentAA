import { Component, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  onLogin(form: NgForm){
    if (form.invalid){
      return;
    }
  }

  ngOnInit(){
  }
}
