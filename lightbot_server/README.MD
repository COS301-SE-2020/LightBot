<div align="center" style = "display: block">
  <div><img src="/icon.jpg"></div>

# LIGHTBOT SERVER WITH NODE AND MONGODB

This repository contains an implementation of the server solution of Lightbot. Lightbot is a software engineering project proposed by ['Fifth Dimension Technologies (5DT)'](5dt.com) for the COS 301 final year module of ['Computer Science'](https://cs.up.ac.za/) at ['University of Pretoria'](https://www.up.ac.za/). It contains a fully fledged express server built on node which provides and API for the web app solution of Lightbot which provides functionality of services as well as authentication and authorization methods.

## Contributers

Mohammed Gangat

## Development

We use `node` with`express`. The first time, you will need to run

```
npm install
```

to install the necessary packages.

You can the start the server with

```
npm run start-dev
```

which will use nodemon for live reloading.

# API Validation

```js
route.post()
```

**Example success**

```json
{
 "success": {
   "message": 
}
```

**Example error**

```json
{
 "errors": {
   "message": 
 }
} 
```

# Unit Testing

* Jest with Supertest [Test files](https://github.com/COS301-SE-2020/LightBot/tree/master/lightbot_server/tests) & [Coverage files](https://github.com/COS301-SE-2020/LightBot/tree/master/lightbot_server/coverage) available here.
* Postman - automated api testing suite
* loadtest - load and response time testing tool via node package manager

# Roadmap

- [X] Initial setup & creaton of MongoDB cluster
- [X] Node installations and package setup
- [X] Service implementation
- [X] Route implementation
- [X] Auth and Verification
- [X] Responses and Logging
- [X] Unit tests with Jest and Supertest
- [X] Integration of Adaptive controllers
- [X] Metric and data arithmetic
- [X] Integration tests with Cypress
- [X] Deployment on AWS EC2 with LoadBalancer
- [X] Performance tests

## Why do we not serve static assets?

Generally it is not a good idea to serve static assets as node js will require alot of cpu time as the server grows. We therefore do not in favour of scalability and will rather serve the web application separately using a frontend framework such as react.

We also intend to provide the front end of the Lightbot Solution using AWS Amplify with React and therefore will deploy the web application to the Amplify console with unit and integration tests of its own using cypress.

## Forethoughts on Layers and Serverless

This server has been built with scalability and security in mind and is purely a rendition for the Lightbot Project as it is a university project. Once we start moving layers into other technologies business/domain logic will be substituted moreso by npm packages, and routing and data layers will lean more to pure AWS Lambda functions with DynamoDB.

# FAQ
