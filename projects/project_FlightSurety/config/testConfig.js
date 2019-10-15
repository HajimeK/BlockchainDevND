var FlightSuretyApp = artifacts.require("FlightSuretyApp");
//var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function (accounts) {

    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x5268f2232368ddba43541aa7a16a9c569d0f9d4f",
        "0x1598cf27b2d63e17fa30ce9cdac39835a600f3aa",
        "0x4abfe47b1a8ae6e6b081726b91f3430476ac6c78",
        "0x2ed5c2f4bc12f1b9cd4264ac7f59e92885232b8b",
        "0xa2a8290cd545e90fa43adb97021c684a64016080",
        "0x2a5bcd0e81c099ba976af542cfebff7f2b6815cc",
        "0x3a5a783487a9e7d2e777c653fbc4be028a47d2fa",
        "0xa6c698cf4d8d321659f29b5312908d96c298a3fc",
        "0xc5dee7131510aa7058728f156880b82842ef8ac5",
        "0x59dca29de60ecf413342f921dcf7922007beb2b3",
        "0x14cf995793928db14b99e6935cc6d67a4e59c342",
        "0xd7b8689a1f8c94289582be1f07c4ff8f93d48f08",
        "0xabad30d5b2a1e228583cad529772de5f30a58c65",
        "0x2e13aac50b4673edf88efc24660d2473e22c870c",
        "0x69a677c87d90b8c43d7f4d4966db0f6491fcf726",
        "0xdfc8eaa840220286b2e4ead7da62eba147f30bed",
        "0x906b93798b52946aebff15a2ff49fbe9d5c9aa85",
        "0x2afbf87f1b7d53342864e154c32c01ae71b8a020",
        "0xad23cb6b6de7c2e794f5c39fde08a14c066bed13",
        "0xe5cefa4edbdce7ad9e437a9397ba4eddc331b8c0"
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];

    //let flightSuretyData = await FlightSuretyData.new({from: owner});
    //let flightSuretyApp = await FlightSuretyApp.new({from: owner});
    //let flightSuretyData = await FlightSuretyData.deployed(); // instantiated inside fligtSruretyApp
    let flightSuretyApp = await FlightSuretyApp.new({ from: owner });
    //pass arguement to flight surety app constructor
    //address of data contract


    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        //flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
}

module.exports = {
    Config: Config
};