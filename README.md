## 👉 Check end of Readme for My Considerations 👈
&nbsp;
&nbsp;

# DEEL BACKEND TASK

  

💫 Welcome! 🎉


This backend exercise involves building a Node.js/Express.js app that will serve a REST API. We imagine you should spend around 3 hours at implement this feature.

## Data Models

> **All models are defined in src/model.js**

### Profile
A profile can be either a `client` or a `contractor`. 
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract
A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job
contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

  
The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

  

1. Start by cloning this repository.

  

1. In the repo root directory, run `npm install` to gather all dependencies.

> Note: Make sure have NodeJS v12.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start both the server and the React client.

  

❗️ **Make sure you commit all changes to the master branch!**

  
  

## Technical Notes

  

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

  

## APIs To Implement 

  

Below is a list of the required API's for the application.

  


1. ***GET*** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. ***GET*** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

1. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. ***POST*** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

  

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

It would be great for example if you'd write some unit test / simple frontend demostrating calls to your fresh APIs.

  

## Submitting the Assignment

When you have finished the assignment, create a github repository and send us the link.

  

Thank you and good luck! 🙏

&nbsp;
&nbsp;
&nbsp;

🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽🔽

# 🙋‍♂️ My Considerations

## Scripts running

- To run unit tests can do `npm run test` or `npm run test:unit`
- To run e2e tests, need to have application running. In one terminal do `npm run start` and in other terminal do `npm run test:e2e`

> Note: Make sure have NodeJS v12.

## Project and Code structure

- `data`:
    Responsible of getting and storing data via ORM interface methods.
- `infra`:
    Setup ORM models and connection and setup the whole application registering routes and providing instances on depency injection parameters.
- `middleware`:
    (Already exists on example) Application middleware for validate authenticated users
- `router`:
    Define routes for each domain and register them on the application server
- `services`:
    Business rules implementation responsible for manage data and control transaction when needed

#### 👉 Regarding tests, I did e2e and unit tests

Unit tests were done for files that implement some business rule in the code, like services and some data providers.
E2e test were done for all endpoints in order to test they are being called and they are integrating correctly with database.
I called e2e and not integration based on one article I follow for define type of testing, that is https://jeromevdl.medium.com/serverless-testing-strategy-b12ada2252f. In the case company have a patter to call it integration test, it's all good to me.

#### 👉 Regarding code structure 
I did some changes on the existing files that were at the example project.
I followed two of SOLID principles that are Dependency Inversion principle and Single Responsiblity Principle. By doing this I could make each file independent of its dependencies
making them easily to maintain in case of a refactor and easily to test by giving test dependencies not needing to mock a lot of things.
The dependency injestion is done at setup time in infra/index.js.

#### 👉 Regarding database transaction and concurrency
I used the Isolation Level Repeatable Read, queries cannot read data that has been modified but not yet committed by other transactions and that no other transactions can modify data that has been read by the current transaction until the current transaction completes.
With this Isolation Level I lock the data read during a small period of time, not being a good thing if the data is read to much by the applcation, but as this time the consistency
is more important to us than performance, I choose for prioritize strong consistency rather than eventual consistency.

## Future development
1. Add custom Error classes to be thrown from services and be handled in routes. 
1. Add json schema validation package to handle request body validation. (Case of `/balances/deposit/:userId`)
1. Add Profile type Admin and validate them at the admin routes

## Last comments
I did not had time to implement some frontend app to show the requests being done, as mentioned would be nice to have in the README. 

For this purpose I commited `Deel.postman_collection.json` in the project, that is my Postman Collection with all requests there.

Also it's possible to check request being done at e2e tests by checking `__tests__/e2e/` folder, there are multiple scenarios for each endpoint and expected responses.
