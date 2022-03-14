const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const express = require('express');
const { all } = require('./routes/apiRoutes');
const router = express.Router();

let allEmployees = [];


const promptUser = () => {

    return inquirer.prompt([
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role']
    }
    ])
    .then(answers => {
        if (answers.choice === 'View all departments') {
            return viewDepartments();
        }
        if (answers.choice === 'View all roles') {
            return viewRoles();
        }
        if (answers.choice === 'View all employees') {
            return viewEmployees();
        }
        if (answers.choice === 'Add a department') {
            return addDepartment();
        }
        if (answers.choice === 'Add a role') {
            return addRole();
        }
        if (answers.choice === 'Add an employee') {
            return addEmployee();
        }
        if (answers.choice === 'Update an employee role') {
            return updateEmployeeRole();
        }
    })
};


const startPrompt = () => {

    console.log(`
            ╔══════════════╗
███████████ EMPLOYEE TRACKER █████████████
            ╚══════════════╝
    `);
    return promptUser();
}

let furtherInput = () => {
    console.log('\n');
    return inquirer.prompt([
        {
            type: "confirm",
            name: "confirmed",
            message: "Would you like to choose another option?"
        }
    ])
    .then( answer => {
        if (answer.confirmed === true) {
            return promptUser();
        } else {
            process.exit();
        }
    })
}

let viewDepartments = () => {

    const sql = `SELECT department.id, department.name AS department_name 
                FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('\n');
        console.table(rows);
    });

    return furtherInput();
};

let viewRoles = () => {

    const sql =`SELECT roles.id, roles.title, roles.salary, department.name AS department
                FROM roles
                LEFT JOIN department
                ON roles.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('\n');
        console.table(rows);
    });

    return furtherInput();
};

let viewEmployees = () => {

    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department_name
                FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('\n');
        console.table(rows);
    });

    return furtherInput();
};

let addDepartment = () => {
    return inquirer.prompt([
        {
        type: 'input',
        name: 'department_name',
        message: 'Enter the new department name',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a department name');
            }
        }
        }
    ])
    .then(answers => {
        const sql = `INSERT INTO department (name) VALUES ('${answers.department_name}')`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.log('\n');
            console.log(`Added ${answers.department_name} to departments`);
        });
        return furtherInput();
    })
};

let addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the role name: ',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the role name');
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role: ',
            validate: nameInput => {
                if (nameInput != isNaN) {
                    return true;
                } else {
                    console.log('Please enter the salary');
                }
            }
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter the department ID for this role: ',
            validate: nameInput => {
                if (nameInput != isNaN) {
                    return true;
                } else {
                    console.log('Please enter the department ID');
                }
            }
        }
    ])
    .then(answers => {
        const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES ('${answers.roleName}','${answers.salary}','${answers.department}')`;
        db.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('\n');
            console.log('Added new role');
        });
        return furtherInput();
    })
}

let addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name');
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name');
                }
            }
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role_id?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a role_id');
                }
            }
        },
    ])
    .then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES ('${answers.firstName}','${answers.lastName}','${answers.role}')`;
        db.query(sql, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('\n');
            console.log(`${answers.firstName} ${answers.lastName} is added as a new employee`);
        })
        return furtherInput();
    });
}

let updateEmployeeRole = () => {
    
    let sql = `SELECT concat(employee.first_name, ' ' , employee.last_name) AS name FROM employee`;
    
    db.query(sql, (err, rows1) => {
        if (err) {
            console.log(err)
        }
     inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to edit? ",
                choices: rows1.map(results => results.name)
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role? ",
                choices: ['Sales Representative','Marketing Associate','UI Engineer','HR Associate','Dev Ops Engineer','Back-End Engineer']
            }
        ])
        .then(answers => {
            const sql = `SELECT roles.id FROM roles WHERE roles.title = ('${answers.role})'
                         WHERE name = ('${answers.name}')
                         UPDATE employee SET role_id = (${answers.role})
                         WHERE id = (${answers.name})`;
            db.query(sql, (err) => {
                if (err) {
                    console.log(err)
                }
                console.log('\n');
                console.log(`${answers.name} is now a ${answers.role}`);
            })
            return furtherInput()
        });
    })
};

startPrompt();

module.exports = { promptUser , startPrompt };


