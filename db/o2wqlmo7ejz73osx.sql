DROP DATABASE IF EXISTS o2wqlmo7ejz73osx;

CREATE DATABASE o2wqlmo7ejz73osx;

USE o2wqlmo7ejz73osx;

CREATE TABLE jawsBurgers (
	id INT AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(20) NULL,
    devoured BOOLEAN,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);