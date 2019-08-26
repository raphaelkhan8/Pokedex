DROP DATABASE IF EXISTS pokemon;

CREATE DATABASE pokemon;

USE pokemon;

CREATE TABLE IF NOT EXISTS Users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  record  int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Pokemon (
  id int NOT NULL AUTO_INCREMENT,
  pokename varchar(255) NOT NULL,
  descript varchar(255) NOT NULL,
  imageurl varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS users_pokemon (
  user_id int NOT NULL,
  pokemon_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(ID),
  FOREIGN KEY (pokemon_id) REFERENCES Pokemon(ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
