# Tutorial #1
## Containerize NodeJS(Express) and MariaDB manually
This project is extended version of the [Rob Hedgpeth's tutorial](https://dev.to/probablyrealrob/getting-started-with-mariadb-using-docker-and-node-js-3djg)  

## How to start
**0. Install dependency:**  
In project root folder, do `npm install`

**1. Create a docker network:**  
`docker network create -d bridge testnw`

Then check if the new network is created:  
`docker network ls`

**2. Run MariaDB container on the test network:**  
`docker run --name mymaria --network testnw -e MARIADB_ROOT_PASSWORD=pass -p 3306:3306 -d docker.io/library/mariadb:10.3`  

Then log in:  
`mysql -h localhost -P 3306 --protocol=TCP -u root -ppass`  

After loggin in, populate db:  
```
CREATE DATABASE demo;
CREATE TABLE demo.people (name VARCHAR(50));
INSERT INTO demo.people VALUES ('rob'), ('tracy'), ('sam'), ('duke');
```

**3. Run NodeJS container:**  
Go to the project root folder:  
`cd path_of_repo/test_node_maria`
> path_of_repo is different in you computer. For example /Users/JohnDoe/repo/test_node_maria

Build container:  
`docker build -t oct19:1.0 .`  

Run container on the test network:  
`docker run --name oct19a --network testnw -p 8080:8080 -d oct19:1.0`  

Check if db is accessible by curl:  
`curl http://localhost:8080/people`  
if connection is correct, the following is displayed:  
```
[{"name":"rob"},{"name":"tracy"},{"name":"sam"},{"name":"duke"}]
```

## Tipps
See `db.js` in this project. You find connection info:  
```
const pool = mariadb.createPool({
//   host: "127.0.0.1",
  host: "mymaria", // container name
  port: 3306, 
  user: "root", 
  password: "pass",
  database: "demo",
  connectionLimit: 5
});
```
The only difference to original tutorial is only `host: "mymaria"`. 
This is the container name which you gave when running MariaDB container.  
