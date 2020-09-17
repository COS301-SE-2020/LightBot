<div align="center" style = "display: block">
  <div><img src="/icon.jpg"></div>

# LIGHTBOT WEB APPLICATION

This repository contains an implementation of the web application solution of Lightbot. Lightbot is a software engineering project proposed by ['Fifth Dimension Technologies (5DT)'](5dt.com) for the COS 301 final year module of ['Computer Science'](https://cs.up.ac.za/) at ['University of Pretoria'](https://www.up.ac.za/). This web application was built using the Javascript library React. It was designed by the contributers with assistance from material design and now ui design kits. The application was implemented using the common redux strategy for providing services and data throughout the application via a store.

## Contributers

Mohammed Gangat & Thiveshan Pillay

## Development & Testing

We use `node` with`express`. The first time, you will need to run

```
npm install
```

# Roadmap

- [X] Initial setup and creation of react application
- [X] Initializing amplify app in the console
- [X] Implementing the front end components
- [X] Introduction of styling and design with scss and ui kits
- [X] Routing and Linking
- [X] Implementing back end functionality and services using redux
- [X] Unit tests with Cypress
- [X] Acquiring of Domain, CName and SSL administration for connectivity with LoadBalancer
- [X] Continuous integration tests with Cypress
- [X] Deployment to the Amplify Console
- [X] Connection of Amplify App to Domain

## Why do we use ReactJS?

Our application is a technical approach to the deployment of the Lightbot system which focuses on delivering a system of data and simulation configurations and visualizations. This requires a robust solution to focus resources on data manipulation and transmission and less on frills and fancies. Hence we decided on a single page application approach whilst dynamically changing data shown and ReactJS combined with Redux for our state and action management was symbiotic to our needs.

## Forethoughts on deployment and CI

The use of a cloud deployment platform such as AWS Amplify or Heroku will be beneficial for easy continuous integration of new developments and tests whilst keeping the application live on our domain. We have chosen Amplify as it provides an easy to manage deployment system which works sidelong with Route 53 our route provider to deploy to our registered domain. It also uses Cypress tests in its deployment cycle which negates the necessity for using an external CI suite such as Circle CI or Travis.

# FAQ

```

```
