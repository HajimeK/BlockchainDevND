//pragma solidity ^0.4.24;
pragma solidity >=0.4.21 <0.6.0;

// Define a contract 'PassengerRole' to manage this role - add, remove, check
contract PassengerData {
  struct Passenger {
    string name;
  }
  mapping(address => Passenger) private passengers;

  // Define 2 events, one for Adding, and other for Removing
  event PassengerAdded(address indexed account);
  event PassengerRemoved(address indexed account);

  // constructor() public {
  //   ;
  // }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyPassenger(address account) {
    require(isPassenger(account));
    _;
  }

  // Define a function 'isPassenger' to check this role
  function isPassenger(address account) public view returns (bool) {
    return (bytes(passengers[account].name).length != 0);
  }

  // Define a function 'addPassenger' that adds this role
  function addPassenger(address account, string calldata name) external {
    _addPassenger(account, name);
  }

  // Define a function 'renouncePassenger' to renounce this role
  function renouncePassenger() public {
    _removePassenger(msg.sender);
  }

  // Define an internal function '_addPassenger' to add this role, called by 'addPassenger'
  function _addPassenger(address account, string memory name) private {
    passengers[account].name = name;
    emit PassengerAdded(account);
  }

  // Define an internal function '_removePassenger' to remove this role, called by 'removePassenger'
  function _removePassenger(address account) private {
    delete passengers[account];
    emit PassengerRemoved(account);
  }
}