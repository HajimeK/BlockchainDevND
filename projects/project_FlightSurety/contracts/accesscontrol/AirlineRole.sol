//pragma solidity ^0.4.24;
pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'AirlineRole' to manage this role - add, remove, check
contract AirlineRole {
  using Roles for Roles.Role;

  uint minimumAirlines = 4;                     // number of airlines that can be added without consensus

  struct Airline {
    address airlineAccount;
    string companyName;
    bool isRegistered;
    bool isFunded;
    uint256 votes;
    mapping(address => bool) voters;                    // track airlines that have already voted
  }

  // Define 2 events, one for Adding, and other for Removing
  event AirlineAdded(address indexed account);
  event AirlineRemoved(address indexed account);

  // Define a struct 'Airlines' by inheriting from 'Roles' library, struct Role
  Roles.Role private Airlines;

  // In the constructor make the address that deploys this contract the 1st Airline
  constructor() public {
    // contractOwner = msg.sender;
    //_addAirline(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAirline() {
    require(isAirline(msg.sender));
    _;
  }

  // Define a function 'isAirline' to check this role
  function isAirline(address account) public view returns (bool) {
    return Airlines.has(account);
  }

  // Define a function 'addAirline' that adds this role
  function addAirline(
      address account,
      string memory companyName)
    public
    onlyAirline
  {
    _addAirline(account, companyName);
  }

  // Define a function 'renounceAirline' to renounce this role
  function renounceAirline() public {
    _removeAirline(msg.sender);
  }

  // Define an internal function '_addAirline' to add this role, called by 'addAirline'
  function _addAirline(
      address account,
      string memory companyName)
    internal {
    Airlines.add(account);
    emit AirlineAdded(account);
  }

  // Define an internal function '_removeAirline' to remove this role, called by 'removeAirline'
  function _removeAirline(address account) internal {
    Airlines.remove(account);
    emit AirlineRemoved(account);
  }
}