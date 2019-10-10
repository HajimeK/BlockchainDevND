import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
const BigNumber = require('bignumber.js');

let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);

const STATUS_CODE_UNKNOWN = 0
const STATUS_CODE_ON_TIME = 10
const STATUS_CODE_LATE_AIRLINE = 20
const STATUS_CODE_LATE_WEATHER = 30
const STATUS_CODE_LATE_TECHNICAL = 40
const STATUS_CODE_LATE_OTHER = 50
const STATUSCODES = [
  STATUS_CODE_UNKNOWN,
  STATUS_CODE_ON_TIME,
  STATUS_CODE_LATE_AIRLINE,
  STATUS_CODE_LATE_WEATHER,
  STATUS_CODE_LATE_TECHNICAL,
  STATUS_CODE_LATE_OTHER
]
// Track all registered oracles
let oracles = {}
web3.eth.defaultAccount = web3.eth.accounts[0]

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
  //  Create tables
  //    Flights {flightKey, status}
  db.run("CREATE TABLE flight (flightKey INTEGER PRIMARY KEY, status INTEGER NOT NULL)")
});

// flightSuretyApp.events.OracleRequest(
//   {fromBlock: 0},
//   function (error, event) {
//     if (error) console.log(error)
//     console.log(event)
//   }
// );

flightSuretyApp.events.eventRegisterFlight({
  fromBlock: 0
}, function (error, event) {
  if (error) console.log(error)
  else {
    console.log(event)
    const flightKey = event.returnValues.flightKey
    const flightStatus = STATUS_CODE_UNKNOWN
    db.run("INSERT INTO flight (" + flightKen + " , " + flightStatus +")" )
  }
});

flightSuretyApp.events.eventApprovedAirline({
  fromBlock: 0
}, async function (error, event) {
  if (error) console.log(error)
  else {
    console.log(event)
    const oracleIndex = event.returnValues.index
    const airline = event.returnValues.airline
    let fee = BigNumber(await flightSuretyApp.methods.getRegistrationFee().call()).toString();

    flightSuretyApp.methods
    .registerOracle()
    .send({ from: airline, value: fee, gas: 4000000 })
    .then(result => {
      flightSuretyApp.methods
        .getMyIndexes()
        .call({ from: airline })
        .then(indices => {
          oracles[airline] = oracleIndex
          console.log(
            'Oracle registered: ' + airline + ' indices:' + oracleIndex
          )
        })
    })
    .catch(error => {
      console.log(
        'Error while registering oracles: ' +
          airline +
          ' Error: ' +
          error
      )
    })
  }
});

//(getRandomIndex(airlineAccount), airlineAccount)

//flightSuretyApp.events.eventUpdateFlightStatus(
flightSuretyApp.events.OracleRequest(
  {fromBlock: 0},
  function (error, event) {
    if (error) console.log(error)
    else {
      console.log(event)
      const index = event.returnValues.index
      const airline = event.returnValues.airline
      const flight = event.returnValues.flight
      const timestamp = event.returnValues.timestamp
      // let randomstatusCode = STATUSCODES[Math.floor(Math.random()*STATUSCODES.length)];
      // console.log("statuscode is:" + randomstatusCode);
      for (var key in oracles) {
        var indexes = oracles[key]
        if (indexes.includes(index)) {
          let randomstatusCode = STATUS_CODE_LATE_AIRLINE // STATUSCODES[Math.floor(Math.random()*STATUSCODES.length)];
          flightSuretyApp.methods
            .submitOracleResponse(
              index,
              airline,
              flight,
              timestamp,
              randomstatusCode
            )
            .send({ from: key, gas: 1000000 })
            .then(result => {
              console.log(
                'Oracle response sent with statuscode: ' +
                  randomstatusCode +
                  ' for ' +
                  flight +
                  ' and index:' +
                  index
              )
            })
            .catch(error => {
              console.log(
                'Error while sending Oracle response  for ' +
                  flight +
                  ' Error:' +
                  error
              )
            })
        }
      }
    }
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


