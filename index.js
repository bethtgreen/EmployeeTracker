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
          name: "Add Roles",
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

    case "ADD_ROLES":
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

function viewDepartments() {
  connection.query(
    "SELECT * FROM department ORDER BY id asc", function (error, results) {if (error) throw error;
      console.table(results);
      start();
    });

}

//functions to add to various tables in database
function addDepartments() {
 
  inquirer
      .prompt({
          name: "department",
          type: "input",
          message: "What's the departments name?",
})
      .then(function(answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department, function(error, results) {
          console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
      })
      viewDepartments();
      })
      
}
function addRoles() {
  inquirer
      .prompt([{
          name: "roles",
          type: "input",
          message: "What role would you like to add to the database?",
      },
      {
        name: "salary",
        type: "input",
        message: "What can this role expected salary be?"
      },
      {
        name: "id",
        type: "input",
        message: "What is the ID of this department? (single number)"
      }
    ]).then(function(answer) {
      var query = "INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? )";
      connection.query(query, [answer.roles, answer.salary, answer.id], function(err, res) {
          console.log(`You have added this role: ${(answer.roles).toUpperCase()}.`)
      })
      viewRoles();
      })
      
}


function addEmployee() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM role", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the new employees first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employees last name?"
        },
        {
          name: "roleName",
          type: "list",
          message: "What role does the employee have?",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
        },
        {
          name: "managerId",
          type: "input",
          message: "What the employees manager id?",
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].title === answer.roleName) {
            chosenItem = results[i].id;
            console.log(chosenItem);
          }
        }
         var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)";
        connection.query(query, [answer.firstName, answer.lastName, chosenItem, answer.managerId], function(err, res) {
            console.log(`You have added this employee: ${(answer.firstName)} ${(answer.lastName)}.`)
           
        })
      });
    });
  }

  function updateRole() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM employee", function(err, results) {
      if (err) throw err;
      var allRoles = connection.query("SELECT * FROM role", function (err, nTitle) {
        if (err) throw err;
        console.log(nTitle);
        return nTitle;
      });
       console.log(results);
      inquirer.prompt([
          {
            name: "employeeName",
            type: "list",
            message: "What is the name of the employee that you'd like to update the role of?",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].first_name +  " " + results[i].last_name);
              }
              return choiceArray;
            },
          },
          {
            
            name: "newTitle",
            type: "list",
            message: "What is the title of the employee that you'd like to update the role of?",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < allRoles.length; i++) {
                choiceArray.push(allRoles[i].title);
              } 
              return choiceArray; 
            }
            
          },
          {
            name: "roleName",
            type: "list",
            message: "What role does the employee have?",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
          },
          {
            name: "managerId",
            type: "input",
            message: "What the employees manager id?",
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.roleName) {
              chosenItem = results[i].id;
              console.log(chosenItem);
            }
          }
           var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)";
          connection.query(query, [answer.firstName, answer.lastName, chosenItem, answer.managerId], function(err, res) {
              console.log(`You have added this employee: ${(answer.firstName)} ${(answer.lastName)}.`)
             
          })
        });
      });
    }
      
init();

