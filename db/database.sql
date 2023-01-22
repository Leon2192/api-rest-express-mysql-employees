CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) DEFAULT NULL salary INT(8) DEFAULT NULL,
    PRIMARY KEY(id)
) DESCRIBE employee;

INSERT INTO
    employee
VALUES
    (1, 'Leonardo', 900),
    (2, 'Agustin', 1200);