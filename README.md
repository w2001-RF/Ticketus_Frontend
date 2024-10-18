# Ticketus Frontend

This is the frontend for the Ticketus web application built using Angular. The frontend provides a user interface for ticket management, user authentication, and settings.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Angular CLI](https://angular.io/cli)
- A running instance of the Ticketus backend API

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ticketus-frontend.git
   cd ticketus-frontend
2. **Install Dependencies**
   ```bash
    npm install
3. **Configure API URL**
  * Update the ``environment.ts`` file to point to your backend API:
    ```bash
    export const environment = {
        production: false,
        backendUrl: 'http://localhost:5000/api/v1'
    };

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
