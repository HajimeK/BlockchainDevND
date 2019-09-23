import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';

let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  //  Create tables
  //    Flights {airline, flight, departureTimestapm, status}
  //    Insurance {flight, passenger, paymentAmount}
});

// flightSuretyApp.events.OracleRequest(
//   {fromBlock: 0},
//   function (error, event) {
//     if (error) console.log(error)
//     console.log(event)
//   }
// );

flightSuretyApp.events.eventGetFlightsByPassenger(
  {fromBlock: 0},
  function (error, event) {
    if (error) console.log(error)
    console.log(event)
    // Query from insurance table for the passenger
    // Return the query result to listenGetFlightsByPassenger
  }
);

flightSuretyApp.events.eventRegisterFlight({
  fromBlock: 0
}, function (error, event) {
  if (error) console.log(error)
  console.log(event)
});


flightSuretyApp.events.eventUpdateFlightStatus(
  {fromBlock: 0},
  function (error, event) {
    if (error) console.log(error)
    console.log(event)
  }
);

const app = express();
app.get('/api', (req, res) => {
    res.send({
      message: 'An API for use with your Dapp!'
    })
})


//+ event eventGetFlightsByPassenger(address passenger)
app.get('/api/GetFlightsByPassenger', (req, res) => {
  console.log(req.query.passenger);
  res.send({
    message: 'An API for use with your Dapp!'
  })
})

//+ event eventGetFlightsByAirline(address airline)
app.get('/api/GetFlightsByAirline', (req, res) => {
  console.log(req.query.airline);
  res.send({
    message: 'An API for use with your Dapp!'
  })
})

//+ event eventGetFlightStatus(address airline, uint32 flight, uint256 timestamp)
app.get('/api/GetFlightStatus', (req, res) => {
  console.log(req.query.airline);
  console.log(req.query.flight);
  res.send({
    message: 'An API for use with your Dapp!'
  })
})

export default app;


