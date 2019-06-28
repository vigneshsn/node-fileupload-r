# Rabo bank assignment - Angularjs + Nodejs

ASSIGNMENT GIVEN
=======================================================================================================================
Rabobank receives monthly deliveries of customer statement records. This information is delivered in two formats, CSV and XML. These records need to be validated.

There are two validations:

    all transaction references should be unique

    the end balance needs to be validated

At the end of the processing, a report needs to be created which will display both the transaction reference and description of each of the failed records.

IMPLEMENTATION OVERVIEW
=======================================================================================================================
This application uses Angular js(version 1.5.0) as an Frontend and Nodejs(version 4.4.7) as backend.

Front End - bower to manage frontend dependencies
1. Implement angular view , controller, service , factory and constant
2. Use 'ngFileUpload' angular plugin and upload files to nodejs
7. Display error or success message based on response from server

Backend - npm to manage backend dependencies
3. Use formidable to parse the form data into files.
4. Check for file extension for support
5. Use csvtojson and xml2js to process csv and xml file respectively
6. Apply validation and return errors


UNIT TESTING
=======================================================================================================================
Jasmine framework is used for unit testing controller.
Karma is used as test runner , type 'npm test' to start the karma and run test cases.

DEPLOYMENT AND TESTING
=======================================================================================================================
Prerequisite
Nodejs must be installed in your machine. (version 4.4.7 or greater)

How to start the application?
Open command promt, navigate to project root directory and type 'npm start'

This command will invoke npm install followed by bower install, once all dependencies are resolved the node application will
get started.

Once the node server started, Access the application in browser http://localhost:3000/
