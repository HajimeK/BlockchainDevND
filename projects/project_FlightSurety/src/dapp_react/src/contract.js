import FlightSuretyApp from './smartcontracts/FlightSuretyApp';
import Config from './config.json';
import Web3 from 'web3';

export default class Contract {
    //    constructor(network, callback) {
    constructor(network) {


        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize();
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
    }

    initialize() {
        this.web3.eth.getAccounts((error, accts) => {

            this.owner = accts[0];

            // let counter = 1;

            // while(this.airlines.length < 5) {
            //     this.airlines.push(accts[counter++]);
            // }

            // while(this.passengers.length < 5) {
            //     this.passengers.push(accts[counter++]);
            // }
        });
    }

    isOperational() {
        let self = this;
        return self.flightSuretyApp.methods
            .isOperational()
            .call({ from: self.owner });
    }

    fetchFlightStatus(flight, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            timestamp: Math.floor(Date.now() / 1000)
        }
        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({ from: self.owner }, (error, result) => {
                callback(error, payload);
            });
    }
}