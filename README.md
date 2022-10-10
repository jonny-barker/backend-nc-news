# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Setting Up The Environment Variables 

If you wish to clone this project and run it locally you first need to setup your own environment variables that will allow you to setup the databases. 

### Step 1:
Run in the terminal the command:
```
npm install dotenv
```
### Step 2
Create a file called .env
### Step 3 
Inside the  file write:

PGDATABASE=database_name_here

