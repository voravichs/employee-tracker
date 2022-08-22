INSERT INTO departments (name)
VALUES ("Nintendo"),
       ("Monolith Soft"),
       ("Intelligent Systems");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("CEO",1000000,1),
       ("Miyamoto",10000000,1),
       ("Producer",200000,2),
       ("Programmer",200000,2),
       ("Composer",20000,2),
       ("Mobile Marketing",30000,3),
       ("History Researcher",30000,3),
       ("Head Writer",30000,3);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Doug","Bowser",1, null),
       ("Shigeru","Miyamoto",2,1),
       ("Tetsuya","Takahashi",3, null),
       ("Toshiaki", "Yajima",4,3),
       ("Yasunori","Mitsuda",5,3),
       ("Ryouichi","Kitanishi",6, null),
       ("Toshiyuki","Nakamura",7,6),
       ("Yukio","Morimoto",8,6);
       
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
