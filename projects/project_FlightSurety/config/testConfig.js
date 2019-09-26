
var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xd63378790242a416e309e76fe8f96b2e2f06c6f1",
        "0x63e8b404ec719cca3f8fac31a31982d6bfb66370",
        "0xaba5a03f37a519f53acce9c711c065e2ca560e5a",
        "0xa71e4e3b0abd326f4b57f29da4d04fcaf0b52269",
        "0x5329ca87ba64ff65fd00158917408b6149a13847",
        "0x7f53c857706928d2bd3359957bb707cfd60dc398",
        "0xfef059ef3b3da4c852fcabbcdf85afb43f660011",
        "0xf36147f282e286796899b3a2befc88e620057d32",
        "0xf9d61adff34dd3542c7c2e4b93cde312828c9e1a",
        "0x8c85afc0319a974c89f5069cf5c3d4da16d66757",
        "0x603bdade8f6f0f4615b394539eb6186412751c88",
        "0x510e2a22f6d57645efe2e42f4096ec9f202f0c81",
        "0x496adcd7552d8cca49687f653be15d815e113632",
        "0x7bac07ba46ec4ba29b357b6f15e0f9579660b780",
        "0x39955a9f2aca9d05c3111ce74815e825d0769776",
        "0x2b80fddc67888e3f64efc06fd3ee22e0523a9829",
        "0xef6c5ac5cea2f6b175db7a09781508bcd75736d1",
        "0xa9dc2c85931068f53224a73317689c08f036ef04",
        "0xfd387e82496fe36e8557dea32efc491ae5d399d9",
        "0x86865c30f7521942c7d1e11550ed11b750db2999"
    ];


    let owner = accounts[0];
    let firstAirline = accounts[1];

    let flightSuretyData = await FlightSuretyData.new();
    let flightSuretyApp = await FlightSuretyApp.new();

    
    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
}

module.exports = {
    Config: Config
};