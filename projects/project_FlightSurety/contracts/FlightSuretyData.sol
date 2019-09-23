//pragma solidity ^0.4.25;
pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./accesscontrol/AirlineData.sol";
import "./accesscontrol/PassengerData.sol";


contract FlightSuretyData is AirlineData, PassengerData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    mapping(bytes32 => uint256) private insurances;

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor ()
        public
    {
        contractOwner = msg.sender;
    }

    function insurance(bytes32 insuranceID,uint256 payamount)
        external
        requireIsOperational
        requireContractOwner
    {
        insurances[insuranceID] = payamount;
    }

    function issuePayment(string calldata passengerName, bytes32 insuranceID)
        external
        requireIsOperational
        requireContractOwner
    {
        require(address(this).balance >= insurances[insuranceID], "No enough balance amount");
        pay(passengerName, insurances[insuranceID]);
    }

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

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */
    function isOperational()
        public
        view
        returns(bool)
    {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */
    function setOperational(
            bool mode )
        external
        requireContractOwner
    {
        operational = mode;
    }

    function getFlightKey
                        (
                            address airline,
                            string memory flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
                            external 
                            payable 
    {
        // fund();
    }
}

