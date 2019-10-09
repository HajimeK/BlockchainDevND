
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
    });

    /****************************************************************************************/
    /* Operations and Settings                                                              */
    /****************************************************************************************/

    // it(`(operation) has correct initial isOperational() value`, async function () {
    //     // Get operating status
    //     let status = await config.flightSuretyData.isOperational.call();
    //     assert.equal(status, true, "Incorrect initial operating status value");
    // });

    // it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {
    //     // Ensure that access is denied for non-Contract Owner account
    //     let accessDenied = false;
    //     try {
    //         await config.flightSuretyData.setOperatingStatus(false, { from: config.testAddresses[2] });
    //     } catch (e) {
    //         accessDenied = true;
    //     }
    //     assert.equal(accessDenied, true, "Access not restricted to Contract Owner");
    // });


    // it(`(multiparty) can access to setOperatingStatus() for Contract Owner account`, async function () {
    //     // Ensure that access is denied for non-Contract Owner account
    //     let accessPermitted = true;
    //     console.log(config.owner);
    //     try {
    //         await config.flightSuretyData
    //             .method
    //             .setOperatingStatus(true,
    //                 { from: config.owner })
    //             .send();
    //     } catch (e) {
    //         console.log(accessPermitted);
    //         accessPermitted = false;
    //     }
    //     assert.equal(accessPermitted, true, "Access not restricted for Contract Owner");
    // });

    it(`(operation) has correct initial isOperational() value`, async function () {
        // Get operating status
        let status = await config.flightSuretyApp.isOperational();
        assert.equal(status, true, "Incorrect initial operating status value");
    });

    it(`(operation) setOperatingStatus() to false`, async function () {
        // Ensure that access is allowed for Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyApp.setOperatingStatus(false);
        } catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, false, "Access restricted even for the Contract Owner");
        let status = await config.flightSuretyApp.isOperational();
        assert.equal(status, false, "Incorrect operating status value");
    });

    it(`(operation) setOperatingStatus() to true`, async function () {
        // Ensure that access is allowed for Contract Owner account
        let accessDenied = true;
        try {
            await config.flightSuretyApp.setOperatingStatus(true);
        } catch (e) {
            accessDenied = false;
        }
        assert.equal(accessDenied, true, "Access restricted even for the Contract Owner");
        let status = await config.flightSuretyApp.isOperational();
        assert.equal(status, true, "Incorrect operating status value");
    });

    it(`(operation) can block access to functions using requireIsOperational when operating status is false`, async function () {
        // Ensure that access is allowed for Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyApp.setOperatingStatus(false, { from: config.testAddresses[5] });
        } catch (e) {
            accessDenied = true;
        }
        assert.equal(accessDenied, true, "Access not restricted even for the Contract Owner");
    });

    it(`(airline) registerAirline for initial airplane`, async function () {
        // Get operating status
        let type = 90;
        let status = 90;
        try {
            await config.flightSuretyApp.registerAirline('airline10', { from: config.testAddresses[10] })
            type = await config.flightSuretyApp.getAccountType({ from: config.testAddresses[10] });
            status = config.flightSuretyApp.getAirlineStatus();
        } catch (e) {
            type = 99;
            status = 99;
        }
        assert.equal(result, 10, "not TYPE_AIRLINE");
        assert.equal(status, 10, "not STATUS_CODE_APPROVED");
    });

    it(`(airline) isApproved for initial airplane`, async function () {
        // Get operating status
        let status = await config.flightSuretyApp.isOperational();
        assert.equal(status, true, "Incorrect initial operating status value");
    });

    it('(airline) Primary contract account is the airline', async () => {
        let result = await config.flightSuretyApp.getAccountType(config.testAddresses[0]);
        // ASSERT
        console.log(result);
        assert.equal(result, TYPE_AIRPLANE, "Primary contract should be registered as an ailine");
    });

    it(`(multiparty) has correct initial isOperational() value`, async function () {
        // Get operating status
        let status = await config.flightSuretyApp.isOperational.call();
        assert.equal(status, true, "Incorrect initial operating status value");
    });

    it('(airline) register airline', async () => {
        // Ensure that access is denied for non-Contract Owner account
        let isAirline = false;
        try {
            await config.flightSuretyApp.registerAirline('airline0', { from: config.testAddresses[0] });

            isAirline = await config.flightSuretyApp.isAirline(config.testAddresses[0]);
            isAirline = ! await config.flightSuretyApp.isApproved('airline0', { from: config.testAddresses[0] });
        } catch (e) {
            isAirline = false;
        }
        assert.equal(isAirline, true, "Registered as an airline");
    });

    it('(airline) Until minimum 4 airlines need to be registered, airline status is approved', async () => {
        // Ensure that access is denied for non-Contract Owner account
        let isApproved0 = false;
        let isApproved1 = false;
        let isApproved2 = false;
        let isApproved3 = false;
        let isApproved4 = true;
        let status = true;

        try {
            await config.flightSuretyApp.registerAirline('airline1', { from: config.testAddresses[1] })
            isApproved1 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline2', { from: config.testAddresses[2] })
            isApproved2 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline3', { from: config.testAddresses[3] })
            isApproved3 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline4', { from: config.testAddresses[4] })
            isApproved4 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });

        } catch (e) {
            status = false;
        }
        status = !(isApproved0 || isApproved1 || isApproved2 || isApproved3 || !isApproved4);
        assert.equal(status, true, "Approval logis is not working propely");
    });

    it('(airline) Airlines are in funded status after properly funded', async () => {
        // Ensure that access is denied for non-Contract Owner account
        let isApproved0 = false;
        let isApproved1 = false;
        let isApproved2 = false;
        let isApproved3 = false;
        let isApproved4 = true;
        let status = true;

        try {
            isApproved0 = config.flightSuretyApp.isApproved('DEFAULT', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline1', { from: config.testAddresses[1] })
            isApproved1 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline2', { from: config.testAddresses[2] })
            isApproved2 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline3', { from: config.testAddresses[3] })
            isApproved3 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });
            await config.flightSuretyApp.registerAirline('airline4', { from: config.testAddresses[4] })
            isApproved4 = config.flightSuretyApp.isApproved('airline1', { from: config.testAddresses[0] });

        } catch (e) {
            status = false;
        }
        status = !(isApproved0 || isApproved1 || isApproved2 || isApproved3 || !isApproved4);
        assert.equal(status, true, "Approval logis is not working propely");
    });
});
/*
---------------
    function registerAirline(string calldata name)
function registerAirline(string calldata name)
fund
function registerAirline(string calldata name)
fund
function registerAirline(string calldata name)
fund
function registerAirline(string calldata name)
fund
function registerAirline(string calldata name)
fund
function registerAirline(string calldata name)
function approveAirline(address airlineAccount)
function approveAirline(address airlineAccount)
fund

function fund()

--------------------
    function buy(
        string calldata airlineName,
        string calldata flightName,
        uint256 timestamp,
        string calldata passengerName)
        external
payable
requireIsOperational
onlyPassenger(msg.sender)
{
    bytes32 flightKey = getFlightKey(
        flightSuretyData.getAirline(airlineName),
        flightName,
        timestamp);
    uint256 amountCreditedToPassenger = msg.value.mul(CREDIT_RATE).div(DIV_RATE);
    flightSuretyData.insurance(flightKey, passengerName, amountCreditedToPassenger);
}

function withdraw(
    uint256 amount)
external
requireIsOperational
onlyPassenger(msg.sender)
{
    flightSuretyData.withdraw(msg.sender, amount);
}

function getAirlineStatus()
external
requireIsOperational
onlyAirline(msg.sender)
returns(uint8) {

    if (flightSuretyData.isFunded(msg.sender)) {
        return STATUS_CODE_APPROVED_FUNDED;
    } else if (flightSuretyData.isApproved(msg.sender)) {
        return STATUS_CODE_APPROVED;
    } else {
        return STATUS_CODE_REGISTERED;
    }  // rejection is out of scope
}

mapping(bytes32 => address) private flightProvider;
modifier onlyFlightProvider(bytes32 flightKey) {
    require(msg.sender == flightProvider[flightKey], "Not a flight owner.");
    _;
}

---------------------
    function registerAirline(string calldata name)
    function registerFlight(string calldata flight, uint256 timestamp)
function updateFlightStatus(string calldata flight, uint256 timestamp, uint8 statusCode)
function addPassenger(address payable account, string calldata name)
buy

// function fetchFlightStatus(
//         address airline,
//         string calldata flight,
//         uint256 timestamp)
//     external
// {
//     uint8 index = getRandomIndex(msg.sender);

//     // Generate a unique key for storing the request
//     bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
//     oracleResponses[key] = ResponseInfo({
//                                             requester: msg.sender,
//                                             isOpen: true
//                                         });

//     emit OracleRequest(index, airline, flight, timestamp);
// }


// region ORACLE MANAGEMENT

// Incremented to add pseudo-randomness at various points
uint8 private nonce = 0;

// Fee to be paid when registering oracle
uint256 public constant REGISTRATION_FEE = 1 ether;

// Number of oracles that must respond for valid status
uint256 private constant MIN_RESPONSES = 3;


struct Oracle {
    bool isRegistered;
    uint8[3] indexes;
}

// Track all registered oracles
mapping(address => Oracle) private oracles;

// Model for responses from oracles
struct ResponseInfo {
    address requester;                              // Account that requested status
    bool isOpen;                                    // If open, oracle responses are accepted
    mapping(uint8 => address[]) responses;          // Mapping key is the status code reported
    // This lets us group responses and identify
    // the response that majority of the oracles
}

// Track all oracle responses
// Key = hash(index, flight, timestamp)
mapping(bytes32 => ResponseInfo) private oracleResponses;

// Event fired each time an oracle submits a response
event FlightStatusInfo(address airline, string flight, uint256 timestamp, uint8 status);

event OracleReport(address airline, string flight, uint256 timestamp, uint8 status);

// Event fired when flight status request is submitted
// Oracles track this and if they have a matching index
// they fetch data and submit a response
event OracleRequest(uint8 index, address airline, string flight, uint256 timestamp);

// Register an oracle with the contract
function registerOracle()
external
payable
{
    // Require registration fee
    require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

    uint8[3] memory indexes = generateIndexes(msg.sender);

    oracles[msg.sender] = Oracle(
        { isRegistered: true, indexes: indexes });
}

function getRegistrationFee()
public
pure
returns(uint256)
{
    return REGISTRATION_FEE;
}

function getMyIndexes()
external
view
returns(uint8[3] memory)
{
    require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

    return oracles[msg.sender].indexes;
}

// Called by oracle when a response is available to an outstanding request
// For the response to be accepted, there must be a pending request that is open
// and matches one of the three Indexes randomly assigned to the oracle at the
// time of registration (i.e. uninvited oracles are not welcome)
function submitOracleResponse(
    uint8 index,
    address airline,
    string calldata flight,
    uint256 timestamp,
    uint8 statusCode)
external
requireIsOperational
{
    require((oracles[msg.sender].indexes[0] == index)
        || (oracles[msg.sender].indexes[1] == index)
        || (oracles[msg.sender].indexes[2] == index), "Index does not match oracle request");

    bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
    require(oracleResponses[key].isOpen, "Flight or timestamp do not match oracle request");

    oracleResponses[key].responses[statusCode].push(msg.sender);

    // Information isn't considered verified until at least MIN_RESPONSES
    // oracles respond with the *** same *** information
    emit OracleReport(airline, flight, timestamp, statusCode);
    if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

        emit FlightStatusInfo(airline, flight, timestamp, statusCode);

        // Handle flight status as appropriate

        if (STATUS_CODE_LATE_AIRLINE == statusCode) {
            bytes32 flightKey = getFlightKey(
                airline,
                flight,
                timestamp);
            flightSuretyData.addPayment(flightKey);
        }
        //    processFlightStatus(airline, flight, timestamp, statusCode);
    }
}

function getFlightKey(
    address airline,
    string memory flight,
    uint256 timestamp)
pure
internal
returns(bytes32)
{
    return keccak256(abi.encodePacked(airline, flight, timestamp));
}

// Returns array of three non-duplicating integers from 0-9
function generateIndexes(
    address account)
internal
returns(uint8[3] memory)
{
    uint8[3] memory indexes;
    indexes[0] = getRandomIndex(account);

    indexes[1] = indexes[0];
    while (indexes[1] == indexes[0]) {
        indexes[1] = getRandomIndex(account);
    }

    indexes[2] = indexes[1];
    while ((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
        indexes[2] = getRandomIndex(account);
    }

    return indexes;
}

// Returns array of three non-duplicating integers from 0-9
function getRandomIndex(
    address account)
internal
returns(uint8)
{
    uint8 maxValue = 10;

    // Pseudo random number...the incrementing nonce adds variation
    uint8 random = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - nonce++), account))) % maxValue);

    if (nonce > 250) {
        nonce = 0;  // Can only fetch blockhashes for last 256 blocks so we adapt
    }

    return random;
}

// endregion

}
*/