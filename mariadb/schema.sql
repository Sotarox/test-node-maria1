CREATE DATABASE IF NOT EXISTS demo;

USE demo;

CREATE TABLE IF NOT EXISTS demo.people (name VARCHAR(50));

-- TODO: Do Insert only when table is empty
INSERT INTO demo.people VALUES ('rob'), ('tracy'), ('sam'), ('duke');