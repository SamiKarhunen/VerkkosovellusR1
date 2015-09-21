DROP DATABASE IF EXISTS vsklogin;
CREATE DATABASE vsklogin;
USE vsklogin;

CREATE TABLE login(
login VARCHAR(20) PRIMARY KEY NOT NULL,
password VARCHAR(20),
is_online TINYINT (1)
);

CREATE TABLE highscore(
id INT(6) PRIMARY KEY auto_increment NOT NULL,
login VARCHAR(20),
score INT(20)
);
