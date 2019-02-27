# CurrencyCatalog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

Used tools :
- Node.js v8.11.3
- Npm v5.6.0
- Yarn v1.7.0

## Dependencies installation
  1) For the mock server: 
  
      a) From project directory : `cd mock-server`
      
      b) run the command line : `npm install`

  2) For the app: 
        
      a) From project directory, run the command line : `npm install`

## Default Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Mode mock

This project is configured to run under a mock configuration. To achieve this, follow these steps :
 
  1) Launch mock server: 
  
      a) From project directory : `cd mock-server`
      
      b) run the command line : `mock-server start`
      
     Documentation is available by running : `mock-server help`
    
     ===> This will start mock server on port 3000
    
  2) Launch the application's custom development server:
  
      a) From project directory: `app-starter mock`
      
     Documentation is available by running : `app-starter help`
    
     ===> This will start custom development server on port 8000.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod --configuration=production --aot` flag for a production build.

## Added features

The project is enhanced with some advanced Angular-based features.

### Offline capabilities with Service Workers

Currency-catalog uses service workers to add offline capabilities, in production mode, when internet connexion goes down.

To simulate this behavior in your local machine, we need basic node server (`npm install -g htp-server`). Then :

  1) From project directory, run `ng build --prod --configuration=production`
  
  2) Run `cd dist/currency-catalog`
  
  3) Run `http-server .`
  
  4) Open the browser and navigate to http://localhost:8080/
  
  5) Reload the page one more time in order to set caches
  
  6) Turn-off WIFI connexion and reload the page, the app is shown even with no internet connexion
  
### HTTP errors handling

The app uses HTTP_INTERCEPTORS to handle requests errors, and show a dialog that indicates 'unavailability of the service' once the server returns an error code.

### Responsive Design

Currency-catalog app uses angular-flex-layout to set a responsive look and feel.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
