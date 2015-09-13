DROP DATABASE IF EXISTS vsklogin;
CREATE DATABASE vsklogin;
USE vsklogin;

CREATE TABLE login(
id INT (6) auto_increment PRIMARY KEY NOT NULL,
login VARCHAR(20),
password VARCHAR(20)
);

CREATE TABLE highscore(
id INT(6) PRIMARY KEY NOT NULL,
login VARCHAR(20),
score INT(20)
);

CREATE TABLE chat(
id INT(6) PRIMARY KEY NOT NULL,
login VARCHAR(20),
message VARCHAR(160)
);
