export interface Test{
  id: string;
  testDate: Date;
  username: string;
  patientType: string;
  symptoms: string;
  testStatus: string;
  testResults?: string;
  testCentreOfficerUsername: string;
}
