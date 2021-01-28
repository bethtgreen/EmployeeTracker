var mysql = require("mysql");
var inquirer = require("inquirer");
const logo = require('asciiart-logo');
const { async } = require("rxjs");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employees"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
  });
// function to show the asciiart-logo
function init(){
  const logoText = logo ({ name: "Beth's Employee Manager"}).render();
  console.log(logoText);
  // run the start function after the connection is made to prompt the user
  start(); 
}
// begin the prompt
function start() {
  inquirer.prompt([
    {
      type:"list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View all Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "View all Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Departments",
          value: "ADD_DEPARTMENTS"
        },
        {
          name: "Add Role",
          value :"ADD_ROLES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "Exit",
          value: "DONE"
        },
      ]
    }
  ]).then((response) => {
    handleChoices(response);
  });
}
function handleChoices(choices){
  switch(choices.choice){
    case "VIEW_EMPLOYEES":
    return viewEmployees();
    
    case "VIEW_ROLES":
    return viewRoles();

    case "VIEW_DEPARTMENTS":
    return viewDepartments();

    case "ADD_DEPARTMENTS":
    return addDepartments();

    case "ADD_ROLE":
      return addRoles();

    case "ADD_EMPLOYEE":
      return addEmployee();

    case "UPDATE_ROLE":
      return updateRole();

      case "EXIT":
        return connection.end();
  }

}
 
function viewEmployees(){
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (error, results) {if (error) throw error;
      console.table(results); 
      start();
    });
    
}

function viewRoles(){
  connection.query(
    "SELECT * FROM role", function (error, results) {if (error) throw error;
      console.table(results);
      start();
    });

}

function viewDepartments(){
  connection.query(
    "SELECT * FROM department", function (error, results) {if (error) throw error;
      console.table(results);
      start();
    });

}



init();


 








// function readProducts() {
  //   console.log("Selecting all items...\n");
  //   connection.query("SELECT * FROM departments", function (err, res) {
  //     if (err) throw err;
  //     // Log all results of the SELECT statement
  //     console.table(res);
  //     // connection.end();
  //   });
  // }
