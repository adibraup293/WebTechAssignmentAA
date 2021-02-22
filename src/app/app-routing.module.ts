import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { RecordTestNewComponent } from "./Tester/record-new-test/new-patient/record-test-new.component";
import { UpdateTestKitComponent} from "./TestCentreManager/ManageTestKit/UpdateTestKit/update-kit.component";
//Routing for patient pages
import { PatientHomeComponent} from "./Patient/patient-home.component";
import { ViewTestingHistoryComponent } from './Patient/view-testing-history/view-testing-history.component';


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
  {path: 'generate-test-report/:testerUsername', component: GenerateTestReportComponent},
  {path: 'enter-test-id', component: EnterTestIDComponent},
  {path: 'update-test-result', component: UpdateTestResultComponent},
  {path: 'update-test/:testId', component: UpdateTestResultComponent},
  {path: 'select-patient', component: SelectPatientComponent},
  {path: 'record-test-new', component: RecordTestNewComponent},
  {path: 'edit/:patientId', component: RecordTestNewComponent},
  //Routing for patient pages
  {path: 'patient-home', component: PatientHomeComponent},
  {path: 'view-testing-history', component: ViewTestingHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
