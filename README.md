# Employee Tracker [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) 

## Description

This project is a command line interface application that takes user input to generate and update an employee database in a company. It uses mySQL2 and inquirer to allow a user to answer questions in the command line and update a persistent database with employee data.

## Packages and Installation

This project uses npm inquirer 8.2.4, mysql2, and console.table. Running 'npm install' with the current package.json in the file will install all dependencies. 

The program can be called from the main working directory using 'node index.js'.

## Usage Instructions & Walkthrough Video

When starting the program, the user is prompted to choose an option from the main menu. 

'View All Employees' will show all the employees in the database, including their role, departments, salaries, and managers. If the manager names are null, the employee is a manager.

'Add Employee' will prompt the user for the first and last name of the new employee, the role of the employee, and the manager of the employee. Selecting "none" for the manager will set the employee as a manager.

'Update Employee Role' prompts the user for the name of the updated employee and the role they want to change that employee to.

'View All Roles' will display all the roles and their associated departments.

'Add Role' will prompt the user for the department, name of the role, and the salary of the role to be added.

'View All Departments' will display the current departments in the database in alphabetical order.

'Add Department' will prompt the user for the name of the department and add it to the database.

Walkthrough Video: https://drive.google.com/file/d/1qV5yqAIASw6TGUXdHoZMpS-SQpESCfZL/view?usp=sharing

## License 

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) 

"Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights."

Read more about this license at: https://choosealicense.com/licenses/gpl-3.0/


## Github Repository Link

GitHub Repository: https://github.com/voravichs/employee-tracker



