//pragma solidity ^0.4.24;
pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'PassengerRole' to manage this role - add, remove, check
contract PassengerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event PassengerAdded(address indexed account);
  event PassengerRemoved(address indexed account);

  // Define a struct 'Passengers' by inheriting from 'Roles' library, struct Role
  Roles.Role private Passengers;

  // In the constructor make the address that deploys this contract the 1st Passenger
  constructor() public {
    _addPassenger(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyPassenger() {
    require(isPassenger(msg.sender));
    _;
  }

  // Define a function 'isPassenger' to check this role
  function isPassenger(address account) public view returns (bool) {
    return Passengers.has(account);
  }

  // Define a function 'addPassenger' that adds this role
  function addPassenger(address account) public onlyPassenger {
    _addPassenger(account);
  }

  // Define a function 'renouncePassenger' to renounce this role
  function renouncePassenger() public {
    _removePassenger(msg.sender);
  }

  // Define an internal function '_addPassenger' to add this role, called by 'addPassenger'
  function _addPassenger(address account) internal {
    Passengers.add(account);
    emit PassengerAdded(account);
  }

  // Define an internal function '_removePassenger' to remove this role, called by 'removePassenger'
  function _removePassenger(address account) internal {
    Passengers.remove(account);
    emit PassengerRemoved(account);
  }
}