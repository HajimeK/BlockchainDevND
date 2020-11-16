pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
// It's important to avoid vulnerabilities due to numeric overflow bugs
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "./IOTData.sol";

contract IOTApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address payable private contractOwner;  // Account used to deploy contract
    IOTData private iotData;
    bool private operational = true;

    /********************************************************************************************/
    /*                                            EVENTS                                        */
    /********************************************************************************************/
    event eventPaid(address tenant, bytes32 deviceID, uint8 amount);

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
        require(!_isTenant(account)), "This account is already registered.");
        _;
    }

    /**
    * @dev Modifier that requires the  account is tenant
    */
    modifier onlyTenant(address account) {
        require(_isTenant(account), "This account is not an airplane account.");
        _;
    }

    modifier onlyFundedTenant(address account) {
        require(_isFundedTenant(account), "This account is not a funded airplane account.");
        _;
    }
    function _isTenant(address account) private view returns (bool) {
        return deviceSuretyData.isTenant(account);
    }

    function _isFundedTenant(address account) private view returns (bool) {
        return iotData.isFunded(account);
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
        iotData = new IOTData(msg.sender);
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational()
        public
        view
        returns(bool)
    {
        return operational;// && deviceSuretyData.isOperational();  // Modify to call data contract's status
    }

    function setOperatingStatus(
            bool mode )
        external
        requireContractOwner {

        //deviceSuretyData.setOperational(mode);
        operational = mode;
    }


    /********************************************************************************************/
    /*                                       DApps                                  */
    /********************************************************************************************/


    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an tenant to the registration queue
    *
    */
    function registerTenant(string calldata name, address account, address accountRegisterBy)
        external
        onlyNewAccount(account)
    {
        deviceSuretyData.addTenant(name, account, accountRegisterBy);
        //emit eventRegisteredTenant(msg.sender);
    }

    function fund()
        external
        payable
        requireIsOperational
        onlyTenant(msg.sender)
        enoughFundAmount
    { // check if got enough fund or not
        iotData.funded(msg.sender);
        // eventFundedTenant(msg.sender);
    }


    function getTenantStatus(address _account)
        external
        requireIsOperational
        onlyTenant(_account)
        returns (uint8) {

        if(deviceSuretyData.isFunded(_account)) {
            emit eventGetTenantStatus(STATUS_CODE_APPROVED_FUNDED);
            return STATUS_CODE_APPROVED_FUNDED;
        } else if(deviceSuretyData.isApproved(_account)) {
            emit eventGetTenantStatus(STATUS_CODE_APPROVED);
            return STATUS_CODE_APPROVED;
        } else {
            emit eventGetTenantStatus(STATUS_CODE_REGISTERED);
            return STATUS_CODE_REGISTERED;
        }  // rejection is out of scope
    }

    /**
        Device Operation only by Tenant
     */
   /**
    * @dev Register a future device for insuring.
    *
    */
    function registerDevice(string calldata device, uint256 timestamp)
        external
        requireIsOperational
        onlyTenant(msg.sender)
        onlyFundedTenant(msg.sender)
    {
        bytes32 deviceKey = getDeviceKey(
                                msg.sender,
                                device,
                                timestamp);
        deviceProvider[deviceKey] = msg.sender;
        emit eventRegisterDevice(deviceKey);
    }

    // @todo avoid other tenants to update the device. Maybe better use /api in the oracle server
    function updateDeviceStatus(string calldata device, uint256 timestamp, uint8 statusCode )
        external
        requireIsOperational
        onlyTenant(msg.sender)
        onlyDeviceProvider(getDeviceKey(msg.sender, device, timestamp))
    {
        bytes32 deviceKey = getDeviceKey(
                                msg.sender,
                                device,
                                timestamp);
        emit eventUpdateDeviceStatus(msg.sender, deviceKey, statusCode);
    }

    // From DeviceKey to tenant address
    mapping(bytes32 => address) private deviceProvider;
    // Only the device provider can operate on the device of the tenant.
    modifier onlyDeviceProvider(bytes32 deviceKey) {
        require(msg.sender == deviceProvider[deviceKey], "Not a device operator.");
        _;
    }


   /**
    * @dev Called after oracle has updated device status
    *
    */
    function listenDeviceStatuUpdatesUpdate(
            address updater,
            string calldata tenantName,
            string calldata deviceName,
            uint256 timestamp,
            uint8 statusCode)
        external
        requireIsOperational
    {
        bytes32 deviceKey = getDeviceKey(
                                deviceSuretyData.getTenant(tenantName),
                                deviceName,
                                timestamp);
        require(deviceProvider[deviceKey] == updater, "Tenants can only update its device.");
        //bytes32 insuranceId;
        if( STATUS_CODE_LATE_AIRLINE == statusCode ){
            deviceSuretyData.addPayment(deviceKey);
        }
    }

    function fetchDeviceStatus(
            address tenant,
            string calldata device,
            uint256 timestamp)
        external
    {
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(abi.encodePacked(index, tenant, device, timestamp));
        oracleResponses[key] = ResponseInfo({
                                                requester: msg.sender,
                                                isOpen: true
                                            });

        emit OracleRequest(index, tenant, device, timestamp);
    }

   /**
    * @dev Add a passenger to the registration queue
    *
    */
    function registerPassenger(string calldata name)
        external
        onlyNewAccount(msg.sender)
    {
        deviceSuretyData.addPassenger(msg.sender, name);
        //emit eventRegisteredTenant(msg.sender);
    }

    function buy(
            string calldata tenantName,
            string calldata deviceName,
            uint256 timestamp,
            string calldata passengerName)
        external
        payable
        requireIsOperational
        onlyPassenger(msg.sender)
    {
        bytes32 deviceKey = getDeviceKey(
                    deviceSuretyData.getTenant(tenantName),
                    deviceName,
                    timestamp);
        uint256 amountCreditedToPassenger = msg.value.mul(CREDIT_RATE).div(DIV_RATE);
        deviceSuretyData.insurance(deviceKey, passengerName, amountCreditedToPassenger);
    }

    function withdraw(
            uint256 amount)
        external
        requireIsOperational
        onlyPassenger(msg.sender)
    {
        deviceSuretyData.withdraw(msg.sender, amount);
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
    // Key = hash(index, device, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event DeviceStatusInfo(address tenant, string device, uint256 timestamp, uint8 status);

    event OracleReport(address tenant, string device, uint256 timestamp, uint8 status);

    // Event fired when device status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(uint8 index, address tenant, string device, uint256 timestamp);

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
            address tenant,
            string calldata device,
            uint256 timestamp,
            uint8 statusCode                        )
        external
        requireIsOperational
    {
        require((oracles[msg.sender].indexes[0] == index) || (oracles[msg.sender].indexes[1] == index) || (oracles[msg.sender].indexes[2] == index), "Index does not match oracle request");

        bytes32 key = keccak256(abi.encodePacked(index, tenant, device, timestamp));
        require(oracleResponses[key].isOpen, "Device or timestamp do not match oracle request");

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(tenant, device, timestamp, statusCode);
        if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

            emit DeviceStatusInfo(tenant, device, timestamp, statusCode);

            // Handle device status as appropriate

            if( STATUS_CODE_LATE_AIRLINE == statusCode ){
                bytes32 deviceKey = getDeviceKey(
                                tenant,
                                device,
                                timestamp);
                deviceSuretyData.addPayment(deviceKey);
            }
        //    processDeviceStatus(tenant, device, timestamp, statusCode);
        }
    }

    function getDeviceKey(
            address tenant,
            string memory device,
            uint256 timestamp)
        internal
        pure
        returns(bytes32)
    {
        return keccak256(abi.encodePacked(tenant, device, timestamp));
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