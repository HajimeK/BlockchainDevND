# Flight Surety Report

## Setup and Run

## Software Versions

$ truffle version
Truffle v5.0.31 (core: 5.0.31)
Solidity v0.5.0 (solc-js)
Node v10.16.2
Web3.js v1.2.1

### Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`
`truffle compile`

### Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js`
`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate`
`npm run dapp`

To view dapp:

`http://localhost:8000`

### Develop Server

`npm run server`
`truffle test ./test/oracles.js`

### Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


### Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)

## Use Cases
<img src="../../out/projects/Project_FlightSurety/UML/usecase/usecase.png" alt="Use Case" title="">

## Class Diagram
<img src="../../out/projects/Project_FlightSurety/UML/class/class.png">

## Operation Design

### Initial DApp Web Page
<img src="../../out/projects/Project_FlightSurety/UML/seq_loadPage/seq_loadPage.png">

### Register Airline
<img src="../../out/projects/Project_FlightSurety/UML/seq_registerAirline/seq_registerAirline.png">

### Approve Airline
<img src="../../out/projects/Project_FlightSurety/UML/seq_approveAirline/seq_approveAirline.png">

### register Flight
<img src="../../out/projects/Project_FlightSurety/UML/seq_registerFlight/seq_registerFlight.png">

### Buy Insurance
<img src="../../out/projects/Project_FlightSurety/UML/seq_buyInsurance/seq_buyInsurance.png">

### Update Flight Status
<img src="../../out/projects/Project_FlightSurety/UML/seq_updateFlightStatus/seq_updateFlightStatus.png">
