import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { ManagerHomeComponent} from "./TestCentreManager/manager-home.component";
//add routing for other test center manager pages here
import { TesterHomeComponent} from "./Tester/tester-home.component";
//add routing for other tester pages here
import { PatientHomeComponent} from "./Patient/patient-home.component";
//add routing for other patient pages here

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'manager-home', component: ManagerHomeComponent},
  //add routing for other test center manager pages here
  {path: 'tester-home', component: TesterHomeComponent},
  //add routing for other tester pages here
  {path: 'patient-home', component: PatientHomeComponent}
  //add routing for other patient pages here
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerHomeComponent,
    //add routing for other test center manager pages here
    TesterHomeComponent,
    //add routing for other tester pages here
    PatientHomeComponent
    //add routing for other patient pages here
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faGlobe);
  }
}
