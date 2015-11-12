# REST Hapi Customers
Is a simple project to show how to build a RESTful API using Hapi framework

# Requirements
* install nodejs version 4.2.^
* install npm 2.4.^
* install mysql 5.5.^ 

# Installation
In order to have a clean installation you must create the database and build the project.

## Database Creation
Create a database named *test* and grant all on this database to user *test* identified by *test*  
using the following command:
```sql
mysql> create database test;
Query OK, 1 row affected (0,00 sec)

mysql> grant all on test.* to 'test'@'localhost' identified by 'test';
Query OK, 1 row affected (0,00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0,01 sec)
```
After creating database, just run the script database/create_database.sql using the command:
```
$ mysql -utest -ptest xpto <database/create_database.sql 
```

## Aplication Build
After git checkout just run:
```
$ npm install
```

# Executing Application
## Development Mode

### Using Node
If you don't want to start the application using gulp, you can start using
```
$ node ./app/app.js
```

### Using Gulp
You can start Hapi using *gulp*, this way every time you update any of the source files
on *./app* the server restarts automatically. In order to start gulp just run:
```
$ gulp
```

## Production Mode
It is advisable to start the application using *pm2*. Using pm2, the process is managed in a 
more controllable way, restarting the node process when it crashes.

Update the file conf/config.json adding a production configuration, then run the command below

The command below starts a cluster with processor-count-1 instances of the server process:
``` 
$ pm2 start ./app/app.js --name rest-hapi-customers -i -1 --env production
```

The command below starts just one instance of the server process:
```
$ pm2 start ./app/app.js --name rest-hapi-customers --env production
```

