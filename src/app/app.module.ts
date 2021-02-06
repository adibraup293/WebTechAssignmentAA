import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from "@angular/material/card";
import { RouterModule, Routes } from "@angular/router";

import { AuthInterceptor } from "./auth/auth-interceptor";

import { LoginComponent } from "./auth/login/login.component";
import { MTHomeComponent} from "./TestCentreManager/ManageTestKit/MTHome.component";
//Routing for manager pages
import { ManagerHomeComponent} from "./TestCentreManager/manager-home.component";
import { RegisterKitComponent} from "./TestCentreManager/ManageTestKit/RegisterTestKit/register-testkit.component";
import { ManagerCreateTestCentre} from "./TestCentreManager/TestCentre/test-centre.component";
import { ManagerRecordTestOfficerComponent} from "./TestCentreManager/RecordOfficer/record-officer.component";
//Routing for tester pages
import { TesterHomeComponent} from "./Tester/tester-home.component";
import { GenerateTestReportComponent } from "./Tester/generate-test-report/generate-test-report.component";
import { EnterTestIDComponent } from "./Tester/update-test-result/enter-test-id/enter-test-id.component";
import { UpdateTestResultComponent } from "./Tester/update-test-result/update-test-result.component";
import { SelectPatientComponent } from "./Tester/record-new-test/select-patient/select-patient.component";
import { RecordTestExistingComponent } from "./Tester/record-new-test/existing-patient/record-test-existing.component";
import { RecordTestNewComponent } from "./Tester/record-new-test/new-patient/record-test-new.component";
import { UpdateTestKitComponent} from "./TestCentreManager/ManageTestKit/UpdateTestKit/update-kit.component";
//Routing for patient pages
import { PatientHomeComponent} from "./Patient/patient-home.component";
import { ViewTestingHistoryComponent } from './Patient/view-testing-history/view-testing-history.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
//Add Font Awesome icons here
import { faSquare, faCheckSquare, faGlobe, faAt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  //Routing for manager pages
  {path: 'manager-home', component: ManagerHomeComponent},
  {path: 'manage-kit', component: MTHomeComponent},
  {path: 'register-kit', component: RegisterKitComponent},
  {path: 'edit/:testkitId', component: RegisterKitComponent},
  {path: 'create-test-centre', component: ManagerCreateTestCentre},
  {path: 'create-officer-profile', component: ManagerRecordTestOfficerComponent},
  {path: 'update-kit', component: UpdateTestKitComponent},
  //Routing for tester pages
  {path: 'tester-home', component: TesterHomeComponent},
  {path: 'generate-test-report', component: GenerateTestReportComponent},
  {path: 'enter-test-id', component: EnterTestIDComponent},
  {path: 'update-test-result', component: UpdateTestResultComponent},
  {path: 'select-patient', component: SelectPatientComponent},
  {path: 'record-test-existing', component: RecordTestExistingComponent},
  {path: 'record-test-new', component: RecordTestNewComponent},
  //Routing for patient pages
  {path: 'patient-home', component: PatientHomeComponent},
  {path: 'view-testing-history', component: ViewTestingHistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MTHomeComponent,
    //Routing for manager pages
    ManagerHomeComponent,
    RegisterKitComponent,
    ManagerCreateTestCentre,
    ManagerRecordTestOfficerComponent,
    UpdateTestKitComponent,
    //Routing for tester pages
    TesterHomeComponent,
    GenerateTestReportComponent,
    EnterTestIDComponent,
    UpdateTestResultComponent,
    SelectPatientComponent,
    RecordTestExistingComponent,
    RecordTestNewComponent,
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
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    //Add Font Awesome icons here
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faGlobe, faAt, faEye, faEyeSlash);
  }
}
