# Northcoders News API

## Contents

  - [Background](#background)
    - [Built with:](#built-with)
      - [Tested with:](#tested-with)
  - [Setup](#setup)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Testing](#testing)
    - [Deployment](#deployment)

https://nc-news-jonathan-barker.herokuapp.com/api

## Background

Northcoders News is an api for a social news website. The database has been built with PostgreSQL interacted with using node-postgres. It allows hosting of articles, topics, comments and users that can be interacted with using queries. 

The api has been built with full test driven development

### Built with: 

- Node.js
- Express
- PostgreSQL

#### Tested with:
- Jest



## Setup

If you wish to clone this project and run it locally on your own device you will need the follow the directions below to do so. 

### Requirements
In order to run this project ensure you have the following versions or higher:

Node version 18.7.0

Postgres version 14.5

### Installation

1. Open a terminal instance
2. Clone this repository from GitHub by running `git clone https://github.com/jonny-barker/be-portfolio-project` in the terminal
3. Add dependencies by typing `npm install` in the terminal
4. Start a new terminal window and enter `npm run setup-dbs` to setup the database 
5. Then to add data to the database enter `npm run seed` This may take a few minutes as there's a fair amount of data. When the process is complete the console will display 'Database seeded' and the node process will terminate.
6. You can then run the application using `npm seed:prod`
### Testing

To test the endpoints are working correctly, run the following command;

```
npm test
```
This will run the 'app.test.js' and 'utils.test.js' file that checks that all the endpoints and utility functions. 

### Deployment 

If you want to deploy this project I suggest using a 