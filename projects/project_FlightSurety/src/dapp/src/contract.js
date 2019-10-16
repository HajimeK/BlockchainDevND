import Web3 from 'web3';
import FlightSuretyApp from './smartcontracts/FlightSuretyApp.json';
import Config from './config.json';


export default class Contract {
    //    constructor(network, callback) {
    constructor(network) {


        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize();
        this.owner = null;
        this.accountType = 0;
        this.airlines = [];
        this.passengers = [];
    }

    async initialize() {
        let self = this;

        this.web3.eth.getAccounts((error, accts) => {

            self.owner = accts[0];
            // self.flightSuretyApp.methods.getAccountType(accts[0])
            //     .send({
            //         from: accts[0],
            //         gas: 4712388,
            //         gasPrice: 100000000000
            //     }, (error, result) => {
            //         callback(result);
            //     })

            // self.accountType = self.flightSuretyApp.methods
            //     .getAccountType(accts[0])
            //     .call({
            //         from: accts[0]
            //     });
            // self.accountType = self.flightSuretyApp.methods
            //     .getAccountType(accts[0])
            //     .send({
            //         from: accts[0],
            //         gas: 4712388,
            //         gasPrice: 100000000000
            //     }, (error, result) => {
            //         console.log(result);
            //     })

            console.log(accts[0]);
            // console.log(self.accountType);
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