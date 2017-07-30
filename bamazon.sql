DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price INT(100) NULL,
  stock_quantity INT(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "foot", 25, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "foot", 7, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sandals", "foot", 45, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirts", "top", 18, 525);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("long sleeve shirts", "top", 26, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blouse", "top", 500, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("undershirts", "top", 9, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "top", 656, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "bottom", 200, 205);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shorts", "bottom", 65, 85);
