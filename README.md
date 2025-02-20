# BIT 306 Web Technologies Assignment
### Topic: COVID Testing Information System (CTIS)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

To run this project, just following the steps under **Connect to MongoDB database** and **Development server** will be sufficient.

## Connect to MongoDB database
First, access the database at `https://account.mongodb.com/account/login`. The credentials for the MongoDB database are as follows:
<br> Username: 
<br> Password: 

Next, go to **Network Access** and select **Add IP Address** (the green button on the right). Then, click the **Add Current IP Address** button and click the **Confirm** button. Your current IP address will be added to the IP access list.

After that, run `node server.js` for checking the connection to database. The command prompt should show 'Connected to database' as the output message.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files*.

*Changes made to files in the backend folder (check-auth.js, patient.js, test.js, testCentre.js, testCentreOfficer.js, testKit.js, user.js and app.js) will not be reflected automatically. For these changes, you need to immediately restart the project by closing and reopening the cmd windows for both client (ng serve) and server (node server.js).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
