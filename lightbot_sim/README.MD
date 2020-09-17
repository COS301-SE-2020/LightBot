<div align="center" style = "display: block">
  <div><img src="/icon.jpg"></div>

# LIGHTBOT SIMULATION WITH SUMO AND SUMOWEB3D

This repository contains an implementation of the visualization solution of Lightbot. Lightbot is a software engineering project proposed by ['Fifth Dimension Technologies (5DT)'](5dt.com) for the COS 301 final year module of ['Computer Science'](https://cs.up.ac.za/) at ['University of Pretoria'](https://www.up.ac.za/). It contains a rendition of ['SUMO'](https://sumo.dlr.de/docs/index.html) with models of the traffic intersections covered by the Lightbot solution as well as sumoweb3D for 3D visualization of the simulations in the web application.

## Contributers

Thiveshan Pillay

## Development

We use `node` with`express`. The first time, you will need to run

```
npm install
```

# Roadmap

- [X] Initial setup and installation of SUMO
- [X] Modeling and designs of Intersections
- [X] Installation and setup of sumoweb3D
- [X] Integration of simulations with web visualizer
- [X] Creation of vehicle generation
- [X] Unit tests with Selenium
- [X] Deployment on AWS EC2 with LoadBalancer
- [X] Integration tests with Cypress

## Why do we use SUMO?

It is an open source software which allows accurate modeling and simulation of different real-world urban road systems. Has a vast set of tools for metric and data collection and modeling. It interfaces well with python back ends and is lightweight and easy to install on cloud solutions such as AWS Elastic Compute.

## Forethoughts on visualization

Can be integrated with sumoweb3D for web visualization. For this project this is sufficient due to time and resources constraints however SUMO has the capability to be modeled using Unity and displayed using new technologies such as web assembly.

# FAQ
