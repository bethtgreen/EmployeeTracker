INSERT INTO department(name) VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role(title, salary, department_id) VALUES ("Software Engineer", 90000.00, 1), 
("Accountant", 70000.00, 2),
 ("Lawyer", 80000.00, 3), 
 ("Salesman", 50000.00, 4), 
 ("Tech Lead", 40000.00, 1), 
 ("Comptroller", 20000.00, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES 
("Rafael", "Vasquez", 2, null), 
("Amanda", "Nelson", 2, 1), 
("Jonathan","Smith", 2, 1);
("Luis", "Hernandez", 4, 1);
("Sofia", "Maria", 1, 1);
("Thomas", "McHill", 3, null);
("Sarah", "Jones", 3, 6);
("Beth", "Green", 3, 6);
("Kerianne", "Jarnagin", 4, 1 );
("Zach", "Garcia", 4, 6);
("Gina", "Thompson", 4, 6);

