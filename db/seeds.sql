INSERT INTO department (name)
VALUES
    ('sales'),
    ('engineering'),
    ('HR');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Sales Representative',85000.00,1),
    ('Marketing Associate',80000.00,1),
    ('UI Engineer',95000.00,2),
    ('HR Associate',65000.00,3),
    ('Dev Ops Engineer',95000.00,2),
    ('Back-End Engineer',95000.00,2);

INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES
    ('Rick','Taverez',2,1),
    ('Alan','Puet',4,3),
    ('Sally','Olega',2,1),
    ('James','West',6,2),
    ('Jordan','Queef',2,1),
    ('Monica','Reyes',3,2),
    ('Andy','Monroe',3,2),
    ('Edward','Hues',4,3),
    ('Emily','Wong',4,3),
    ('Alex','Brown',2,1),
    ('Xavier','Slorn',5,2),
    ('Amanda','Williams',6,2),
    ('Clark','Kent',3,2),
    ('Bruce','Wayne',6,2);

