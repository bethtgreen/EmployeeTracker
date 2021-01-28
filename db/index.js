var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // run the start function after the connection is made to prompt the user
    start();
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