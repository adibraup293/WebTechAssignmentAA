export interface Test{
  id?: string;
  testDate: Date;
  patientUsername: string;
  patientType: string;
  symptoms: string;
  testStatus?: string;
  testResults?: string;
}
