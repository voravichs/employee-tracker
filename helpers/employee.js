
function printTeam() {
    console.log('Current Team Members: \n');
    console.log(teamData);
    console.log('\n-------------\n');
    mainMenuPrompt();
}

function addTeam() {
    return inquirer
        .prompt(employeeQuestions)
        .then(response => {
            const currentTeamMember = [response.name, currentID, response.email]
            currentID++;
            switch (response.role) {
                case 'Manager':
                    addManager(currentTeamMember);
                    break;
                case 'Engineer':
                    addEngineer(currentTeamMember);
                    break;
                case 'Intern':
                    addIntern(currentTeamMember);
                    break;
            }
        });
}

function addManager(member) {
    return inquirer
        .prompt(roleQuestions[0])
        .then(response => {
            let name = member[0].trim();
            let id = member[1];
            let email = member[2].trim();
            let officeNum = response.officeNum;
            try {
                managerData.push(new Manager(name, id, email, parseInt(officeNum)));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Manager ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function addEngineer(member) {
    return inquirer
        .prompt(roleQuestions[1])
        .then(response => {
            let name = member[0].trim();
            let id = member[1];
            let email = member[2].trim();
            let github = response.github;
            try {
                engineerData.push(new Engineer(name, id, email, github));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Engineer ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function addIntern(member) {
    return inquirer
        .prompt(roleQuestions[2])
        .then(response => {
            let name = member[0].trim();
            let id = member[1];
            let email = member[2].trim();
            let school = response.school;
            try {
                internData.push(new Intern(name, id, email, school));
                teamData = [managerData, engineerData, internData];
                console.log('\x1b[32m', `Intern ${name} added, returning to main menu!`);
                console.log('\n-------------\n');
                mainMenuPrompt();
            } catch (err) {
                console.error(err)
                console.log('\x1b[31m', 'Invalid input, returning to main menu!');
                console.log('\n-------------\n');
                mainMenuPrompt();
            }
        });
}

function removeRole() {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: "Which position would you like to remove?",
                name: 'roleRemove',
                choices: ['manager', 'engineer', 'intern', 'Return']
            },
        ])
        .then(response => {
            switch (response.roleRemove) {
                case 'Return':
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
                default:
                    console.log(response.roleRemove);
                    removeTeam(response.roleRemove);
            }
        });
}

function removeTeam(role) {
    let currentData = eval(role + 'Data');
    if (!currentData.length) {
        console.log('\x1b[31m','No team members currently in that role, returning to main menu.');
        console.log('\n-------------\n');
        mainMenuPrompt();
        return
    }
    return inquirer
        .prompt([
            {
                type: 'list',
                message: "Which team member would you like to remove?",
                name: 'teamRemove',
                choices: [...currentData, 'Return']
            }
        ])
        .then(response => {
            switch (response.teamRemove) {
                case 'Return':
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
                default:
                    let selectedIndex = currentData.findIndex(employee => employee.name === response.teamRemove)
                    console.log(selectedIndex);
                    currentData.splice(selectedIndex, 1);
                    teamData = [managerData, engineerData, internData];
                    console.log(`Removed ${response.teamRemove} from team.`);
                    console.log('\n-------------\n');
                    mainMenuPrompt();
                    break;
            }
        });
}

function clearTeam() {
    teamData = [];
    console.log(`Cleared saved team!`);
    console.log('\n-------------\n');
    mainMenuPrompt();
}
