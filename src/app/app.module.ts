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
//Routing for manager pages
import { ManagerHomeComponent} from "./TestCentreManager/manager-home.component";
//Routing for tester pages
import { TesterHomeComponent} from "./Tester/tester-home.component";
//Routing for patient pages
import { PatientHomeComponent} from "./Patient/patient-home.component";
import { ViewTestingHistoryComponent } from './Patient/view-testing-history/view-testing-history.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  //Routing for manager pages
  {path: 'manager-home', component: ManagerHomeComponent},
  //Routing for tester pages
  {path: 'tester-home', component: TesterHomeComponent},
  //Routing for patient pages
  {path: 'patient-home', component: PatientHomeComponent},
  {path: 'view-testing-history', component: ViewTestingHistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //Routing for manager pages
    ManagerHomeComponent,
    //Routing for tester pages
    TesterHomeComponent,
    //Routing for patient pages
    PatientHomeComponent,
    ViewTestingHistoryComponent
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
