var mysql = require("mysql");
var inquirer = require("inquirer");
const logo = require('asciiart-logo');

// function to show the asciiart-logo
function init(){
    const logoText = logo ({ name: "Beth's Employee Manager"}).render();
    console.log(logoText);
      // run the start function after the connection is made to prompt the user
      start();
}
init()

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
  //function to ask user if they would like to add anything new
  function start() {
    inquirer
      .prompt([
       { name: "databasePrompt",
        type: "list",
        message: "Would you like to ADD to, VIEW or UPDATE the database",
        choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
       }
    ])
    .then(function(answer){
        switch (answer.databasePrompt) {
            case "ADD":
                // return addDatabase()
            case "VIEW":
                // return
            case  "UPDATE":
                // return
            case "EXIT":
                return connection.end();

        }
    })
  }
  function addDatabase(){
      inquirer
        .prompt([
            {
                name: "addPrompt",
                type: "list",
                message: "Would you like to add to the DEPARTMENTS, ROLES, or EMPLOYEES?",
                choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES"]
            }
        ])
        .then(function(answer){

        })
  }
  function readProducts() {
    console.log("Selecting all items...\n");
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      // connection.end();
    });
  }
