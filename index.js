const inquirer = require('inquirer');

const promptUser = () => {

    return inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role']
    }, 
        {
            type: 'input',
            name: 'url',
            message: 'enter the URL',
            when: (answers) => answers.choice === 'View all departments'
        },
        {
            type: 'input',
            name: 'poot',
            message: 'enter your poot',
            when: (answers) => answers.choice === 'View all roles'
        },
        {
            type: 'input',
            name: 'poot1',
            message: 'enter your poot1',
            when: (answers) => answers.choice === 'View all employees'
        },
        {
            type: 'input',
            name: 'poot2',
            message: 'Enter the name of your new department: ',
            when: (answers) => answers.choice === 'Add a department'
        },
        {
            type: 'input',
            name: 'poot3',
            message: 'Enter the name of the new role: ',
            when: (answers) => answers.choice === 'Add a role'
        },
        {
            type: 'input',
            name: 'poot4',
            message: 'Enter the salary of the new role: ',
            when: (answers) => answers.choice === 'Add a role'
        },
        {
            type: 'input',
            name: 'poot5',
            message: 'Enter the department of the new role: ',
            when: (answers) => answers.choice === 'Add a role'
        },
        {
            type: 'input',
            name: 'poot6',
            message: "Enter the employee's first name: ",
            when: (answers) => answers.choice === 'Add an employee'
        },
        {
            type: 'input',
            name: 'poot7',
            message: "Enter the employee's last name: ",
            when: (answers) => answers.choice === 'Add an employee'
        },
        {
            type: 'input',
            name: 'poot8',
            message: "Enter the employee's role: ",
            when: (answers) => answers.choice === 'Add an employee'
        },
        {
            type: 'list',
            name: 'poot9',
            message: "Which employee's role would you like to update? ",
            choices: ['test1','test2','test3','test4','test5'],    //hardcoding for now
            when: (answers) => answers.choice === 'Update an employee role'
        },
        {
            type: 'input',
            name: 'poot10',
            message: "What is the new role? ",
            when: (answers) => answers.choice === 'Update an employee role'
        },
        

]);
};

const startPrompt = () => {

    console.log(`
    ================================
    Welcome to the Employee Tracker!
    ================================
    `);
    return promptUser();
}

startPrompt();

module.exports = { promptUser , startPrompt };