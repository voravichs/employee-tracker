const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printEmployees, addEmployees, updateEmployees } = require('./helpers/employee');
const { printRoles, addRoles } = require('./helpers/roles');
const { printDepartments, addDepartments} = require('./helpers/departments');

// Main Menu Prompt
function mainMenuPrompt() {
    return inquirer
        .prompt(
            {
                type: 'list',
                message: `MAIN MENU: `,
                name: 'menu',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'QUIT']
            }
        )
        .then(response => {
            switch (response.menu) {
                case 'View All Employees':
                    console.log('\n-------------\n');
                    printEmployees();
                    mainMenuPrompt();
                    break;
                case 'Add Employee':
                    console.log('\n-------------\n');
                    addEmployees();
                    mainMenuPrompt();
                    break;
                case 'Update Employee Role':
                    console.log('\n-------------\n');
                    updateEmployees();
                    mainMenuPrompt();
                    break;
                case 'View All Roles':
                    console.log('\n-------------\n');
                    printRoles();
                    mainMenuPrompt();
                    break;
                case 'Add Role':
                    console.log('\n-------------\n');
                    addRoles();
                    mainMenuPrompt();
                    break;
                case 'View All Departments':
                    console.log('\n-------------\n');
                    printDepartments();
                    mainMenuPrompt();
                    break;
                case 'Add Department':
                    console.log('\n-------------\n');
                    addDepartments();
                    mainMenuPrompt();
                    break;
                case 'QUIT':
                    break;
            }
        });
}

// Function calls to initialize app
console.log(`

███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 


███    ███  █████  ███    ██  █████   ██████  ███████ ██████         
████  ████ ██   ██ ████   ██ ██   ██ ██       ██      ██   ██        
██ ████ ██ ███████ ██ ██  ██ ███████ ██   ███ █████   ██████         
██  ██  ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██      ██   ██        
██      ██ ██   ██ ██   ████ ██   ██  ██████  ███████ ██   ██                                                                                  

`)
mainMenuPrompt();