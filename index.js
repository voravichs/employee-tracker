const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');


const employeeQuestions = [
    {
        type: 'input',
        message: 'Enter the name of your team member:',
        name: 'name'
    },
    {
        type: 'list',
        message: 'Select their position:',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        message: 'Enter the email of your team member:',
        name: 'email'
    },
];

const roleQuestions = [
    {
        type: 'input',
        message: 'Enter the office number of this manager:',
        name: 'officeNum'
    },
    {
        type: 'input',
        message: 'Enter the github username of this engineer:',
        name: 'github'
    },
    {
        type: 'input',
        message: 'Enter the school this intern is attending/graduated from:',
        name: 'school'
    },
];

// Create a function to initialize app
// https://www.reddit.com/r/node/comments/9q3chw/looping_inquirerjs_prompts/
// https://stackoverflow.com/questions/45060200/in-node-js-how-do-i-create-a-prompt-loop-using-inquirer
function mainMenuPrompt() {
    return inquirer
        .prompt(
            {
                type: 'list',
                message: `

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
                                                                                     
                                                                                     
                `,
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

                    break;
                case 'Add Employee':
                    console.log('\n-------------\n');

                    break;
                case 'Update Employee Role':
                    console.log('\n-------------\n');

                    break;
                case 'View All Roles':
                    console.log('\n-------------\n');
                    
                    break;
                case 'Add Role':
                    console.log('\n-------------\n');

                    break;
                case 'View All Departments':
                    console.log('\n-------------\n');

                    break;
                case 'Add Department':
                    console.log('\n-------------\n');

                    break;
                case 'QUIT':
                    break;
            }
        });
}

// Function call to initialize app
mainMenuPrompt();

