//pragma solidity ^0.4.25;
pragma solidity >=0.4.25 <0.6.0;


// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./FlightSuretyData.sol";

/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Airline Registration Status Code
    uint8 private constant STATUS_CODE_REGISTERED = 0;
    uint8 private constant STATUS_CODE_APPROVED = 10;
    uint8 private constant STATUS_CODE_APPROVED_FUNDED = 20;
    uint8 private constant STATUS_CODE_REJECTED = 99;
    // Flight status codees
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;
    // Account Type
    uint8 private constant TYPE_UNDEFINED = 0;
    uint8 private constant TYPE_AIRLINE = 10;
    uint8 private constant TYPE_PASSENGER = 20;

    uint256 private constant CREDIT_RATE = 15;
    uint256 private constant DIV_RATE = 10;

    address payable private contractOwner;          // Account used to deploy contract
    FlightSuretyData private flightSuretyData;
    bool private operational = true;

    /********************************************************************************************/
    /*                                            EVENTS                                        */
    /********************************************************************************************/
    //event eventRegisteredAirline(address airline);
    event eventApprovedAirline(uint8 index, address airline);
    //event eventFundedAirline(address airline);

    event eventRegisterFlight(bytes32 flightID);
    event eventUpdateFlightStatus(address airline, bytes32 flightID, uint8 status);


    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational()
    {
         // Modify to call data contract's status
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier enoughFundAmount() {
        require(msg.value >= 10 ether, 'Not enough fund amount. Should be larger then 10 ether');
        _;
    }

    /**
    * @dev Modifier that requires the the account is not registered yet
    */
    modifier onlyNewAccount(address account) {
        require(!(_isAirline(account) || _isPassenger(account)), "This account is already registered.");
        _;
    }

    /**
    * @dev Modifier that requires the  account is airline
    */
    modifier onlyAirline(address account) {
        require(_isAirline(account), "This account is not an airplane account.");
        _;
    }

    /**
    * @dev Modifier that requires the account is passenger
    */
    modifier onlyPassenger(address account) {
        require(_isPassenger(account), "This account is not an passenger account.");
        _;
    }

    function _isAirline(address account) private view returns (bool) {
        return flightSuretyData.isAirline(account);
    }
    function _isPassenger(address account) private view returns (bool) {
        return flightSuretyData.isPassenger(account);
    }

    function getAccountType() public view returns (uint8) {
        if(_isAirline(msg.sender)) {
            return TYPE_AIRLINE;
        } else if (_isPassenger(msg.sender)) {
            return TYPE_PASSENGER;
        } else {
            return TYPE_UNDEFINED;
        }
    }

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
    * @dev Contract constructor
    *
    */
    constructor () public
    {
        contractOwner = msg.sender;
        flightSuretyData = FlightSuretyData(contractOwner);
        //flightSuretyData.addAirline(msg.sender, "DEFAULT");
    }

    function datacontract() public returns (bool) {
        return flightSuretyData.isOperational();
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational()
        public
        view
        returns(bool)
    {
        return operational;// && flightSuretyData.isOperational();  // Modify to call data contract's status
    }

    function setOperatingStatus(
            bool mode )
        external
        requireContractOwner {

        //flightSuretyData.setOperational(mode);
        operational = mode;
    }


    /********************************************************************************************/
    /*                                       DApps                                  */
    /********************************************************************************************/


    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *
    */
    function registerAirline(string calldata name)
        external
        onlyNewAccount(msg.sender)
    {
        flightSuretyData.addAirline(msg.sender, name);
        //emit eventRegisteredAirline(msg.sender);
    }

    function approveAirline(address airlineAccount)
        external
        onlyAirline(msg.sender)
    {
        flightSuretyData.approveAirline(airlineAccount, msg.sender);
        if ( flightSuretyData.isApproved(airlineAccount)) {
            emit eventApprovedAirline(getRandomIndex(airlineAccount), airlineAccount);
        }
    }

    function fund()
        external
        payable
        requireIsOperational
        onlyAirline(msg.sender)
        enoughFundAmount
    { // check if got enough fund or not
        flightSuretyData.funded(msg.sender);
        //emit eventFundedAirline(msg.sender);
    }


    function getAirlineStatus()
        external
        view
        requireIsOperational
        onlyAirline(msg.sender)
        returns (uint8) {

        if(flightSuretyData.isFunded(msg.sender)) {
            return STATUS_CODE_APPROVED_FUNDED;
        } else if(flightSuretyData.isApproved(msg.sender)) {
            return STATUS_CODE_APPROVED;
        } else {
            return STATUS_CODE_REGISTERED;
        }  // rejection is out of scope
    }

    /**
        Flight Operation only by Airline
     */
   /**
    * @dev Register a future flight for insuring.
    *
    */
    function registerFlight(string calldata flight, uint256 timestamp)
        external
        requireIsOperational
        onlyAirline(msg.sender)
    {
        bytes32 flightKey = getFlightKey(
                                msg.sender,
                                flight,
                                timestamp);
        flightProvider[flightKey] = msg.sender;
        emit eventRegisterFlight(flightKey);
    }

    // @todo avoid other airlines to update the flight. Maybe better use /api in the oracle server
    function updateFlightStatus(string calldata flight, uint256 timestamp, uint8 statusCode )
        external
        requireIsOperational
        onlyAirline(msg.sender)
        onlyFlightProvider(getFlightKey(msg.sender, flight, timestamp))
    {
        bytes32 flightKey = getFlightKey(
                                msg.sender,
                                flight,
                                timestamp);
        emit eventUpdateFlightStatus(msg.sender, flightKey, statusCode);
    }

    // From FlightKey to airline address
    mapping(bytes32 => address) private flightProvider;
    // Only the flight provider can operate on the flight of the airline.
    modifier onlyFlightProvider(bytes32 flightKey) {
        require(msg.sender == flightProvider[flightKey], "Not a flight operator.");
        _;
    }


   /**
    * @dev Called after oracle has updated flight status
    *
    */
    function listenFlightStatuUpdatesUpdate(
            address updater,
            string calldata airlineName,
            string calldata flightName,
            uint256 timestamp,
            uint8 statusCode)
        external
        requireIsOperational
    {
        bytes32 flightKey = getFlightKey(
                                flightSuretyData.getAirline(airlineName),
                                flightName,
                                timestamp);
        require(flightProvider[flightKey] == updater, "Airlines can only update its flight.");
        //bytes32 insuranceId;
        if( STATUS_CODE_LATE_AIRLINE == statusCode ){
            flightSuretyData.addPayment(flightKey);
        }
    }

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

   /**
    * @dev Add a passenger to the registration queue
    *
    */
    function registerPassenger(string calldata name)
        external
        onlyNewAccount(msg.sender)
    {
        flightSuretyData.addPassenger(msg.sender, name);
        //emit eventRegisteredAirline(msg.sender);
    }

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
    function registerOracle ()
        external
        payable
    {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle(
            {isRegistered: true, indexes: indexes});
    }

    function getRegistrationFee()
        public
        pure
        returns (uint256)
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
            uint8 statusCode                        )
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

            if( STATUS_CODE_LATE_AIRLINE == statusCode ){
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
        while(indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex(
            address account)
        internal
        returns (uint8)
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