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
import { ManagerHomeComponent} from "./TestCentreManager/manager-home.component";

import { LoginComponent } from "./login/login.component";

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'manager-home', component: ManagerHomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerHomeComponent
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
