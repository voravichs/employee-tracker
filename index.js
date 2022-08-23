const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const { orderedSelectAll, roleQuery, employeeQuery } = require('./helpers/queries')

let departmentArr = [];
let rolesArr = [];
let managerArr = ["None"];
let managerIDArr = [null];
let employeeArr = [];

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Iloveredpandas',
    database: 'company_db'
},
    console.log(`Connected to the company_db database.`)
);

const init = () => {
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
    buildStorageArr();
    mainMenuPrompt();
}

//* ---------- Main Menu ----------- *//
const mainMenuPrompt = async () => {
    const response = await inquirer
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
    switch (response.menu) {
        case 'View All Employees':
            console.log('\n\n');
            printEmployees();
            break;
        case 'Add Employee':
            console.log('\n\n');
            addEmployees();
            break;
        case 'Update Employee Role':
            console.log('\n\n');
            updateEmployees();
            break;
        case 'View All Roles':
            console.log('\n\n');
            printRoles();
            break;
        case 'Add Role':
            console.log('\n\n');
            addRoles();
            break;
        case 'View All Departments':
            console.log('\n\n');
            printDepartments();
            break;
        case 'Add Department':
            console.log('\n\n');
            addDepartments();
            break;
        case 'QUIT':
            process.exit();
    }
}

//* ---------- Build Initial Arrays for Departments, Roles, and Managers ----------- *//
const buildStorageArr = () => {
    // Departments
    db.query("SELECT name FROM departments",
        (err, res) => {
            if (err) throw console.error(err)
            for (let i = 0; i < res.length; i++) {
                departmentArr.push(res[i].name);
            }
        }
    )
    // Roles
    db.query("SELECT title FROM roles",
        (err, res) => {
            if (err) throw console.error(err)
            for (let i = 0; i < res.length; i++) {
                rolesArr.push(res[i].title);
            }
        }
    )
    // Managers 
    db.query("SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL",
        (err, res) => {
            if (err) throw console.error(err)
            for (let i = 0; i < res.length; i++) {
                managerArr.push(res[i].first_name + ' ' + res[i].last_name);
                managerIDArr.push(res[i].id);
            }
        }
    )
    // Employees
    db.query("SELECT first_name, last_name FROM employees",
        (err, res) => {
            if (err) throw console.error(err)
            for (let i = 0; i < res.length; i++) {
                employeeArr.push(res[i].first_name + ' ' + res[i].last_name);
            }
        }
    )
}

//* ---------- Department Methods ----------- *//
const printDepartments = () => {
    db.query(orderedSelectAll("departments", "name"),
        async (err, res) => {
            if (err) throw console.error(err)
            const queryRes = await res
            console.table(queryRes);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}

const addDepartments = async () => {
    const response = await inquirer
        .prompt(
            {
                type: 'input',
                message: `Enter the name of the department you would like to add: `,
                name: 'name',
            }
        )
    if (departmentArr.includes(response.name.trim())) {
        console.log('\x1b[31m', `${response.name.trim()} is already in the database. Returning to main menu.`);
        console.log('\n\n');
        mainMenuPrompt();
    } else {
        db.query("INSERT INTO departments (name) VALUES (?)",
            [response.name.trim()],
            (err) => {
                if (err) throw console.error(err)
                departmentArr.push(response.name.trim());
                console.log('\x1b[32m', `${response.name.trim()} has been added to the departments database.`);
                console.log('\n\n');
                mainMenuPrompt();
            }
        )
    }

}


//* ---------- Role Methods ----------- *//
const printRoles = () => {
    db.query(roleQuery(),
        async (err, res) => {
            if (err) throw console.error(err)
            const departmentRes = await res
            console.table(departmentRes);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}

const addRoles = async () => {
    const response = await inquirer
        .prompt([
            {
                type: 'list',
                message: `Select the department this role will be associated with: `,
                name: 'department',
                choices: departmentArr
            },
            {
                type: 'input',
                message: `Enter the name of the role you would like to add: `,
                name: 'title',
            },
            {
                type: 'input',
                message: `Enter the salary this role will earn: `,
                name: 'salary',
            },
        ])
    db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
        [response.title.trim(), response.salary.trim(), departmentArr.indexOf(response.department) + 1],
        (err) => {
            if (err) throw console.error(err);
            rolesArr.push(response.title.trim());
            console.log('\x1b[32m', `${response.title.trim()} has been added to the roles database.`);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}


//* ---------- Employee Methods ----------- *//
const printEmployees = () => {
    db.query(employeeQuery(),
        async (err, res) => {
            if (err) throw console.error(err)
            const departmentRes = await res
            console.table(departmentRes);
            console.log(employeeArr);
            console.log(managerArr);
            console.log(managerIDArr);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}

const addEmployees = async () => {
    const response = await inquirer
        .prompt([
            {
                type: 'input',
                message: `Enter the first name of the employee you want to add: `,
                name: 'firstName',
            },
            {
                type: 'input',
                message: `Enter the last name of the employee you want to add:`,
                name: 'lastName',
            },
            {
                type: 'list',
                message: `Select the role of the employee: `,
                name: 'role',
                choices: rolesArr
            },
            {
                type: 'list',
                message: `Select the manager of the employee: `,
                name: 'manager',
                choices: managerArr
            },
        ])
    let managerRes = '';
    if (response.manager == "None") {
        managerRes = null;
        managerArr.push(response.firstName.trim() + ' ' + response.lastName.trim());
        managerIDArr.push(employeeArr.length + 1);
    } else {
        managerRes = managerIDArr[managerArr.indexOf(response.manager)];
    }
    console.log(managerRes)
    db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [response.firstName.trim(), response.lastName.trim(), rolesArr.indexOf(response.role) + 1, managerRes],
        (err) => {
            if (err) throw console.error(err);
            employeeArr.push(response.firstName.trim() + ' ' + response.lastName.trim());
            console.log('\x1b[32m', `${response.firstName.trim()} ${response.lastName.trim()} has been added to the employees database.`);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}

const updateEmployees = async () => {
    const response = await inquirer
        .prompt([
            {
                type: 'list',
                message: `Select the employee you would like to update:`,
                name: 'employee',
                choices: employeeArr
            },
            {
                type: 'list',
                message: `Select the role you would like to change this employee to:`,
                name: 'role',
                choices: rolesArr
            },
        ])
    console.log([rolesArr.indexOf(response.role) + 1, employeeArr.indexOf(response.employee) + 1])
    db.query("UPDATE employees SET role_id = ? WHERE id = ?",
        [rolesArr.indexOf(response.role) + 1, employeeArr.indexOf(response.employee) + 1],
        (err) => {
            if (err) throw console.error(err);
            console.log('\x1b[32m', `${response.employee} has been updated.`);
            console.log('\n\n');
            mainMenuPrompt();
        }
    )
}

// Function calls to initialize app
init();