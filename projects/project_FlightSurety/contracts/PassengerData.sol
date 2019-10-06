//pragma solidity ^0.4.24;
pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

// Define a contract 'PassengerRole' to manage this role - add, remove, check
contract PassengerData {
  using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)
  struct Passenger {
    string name;
  }
  mapping(address => Passenger) private passengers;
  mapping(string => address payable) private passengerByName;
  mapping(address => uint) private withdrawable;

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
  function addPassenger(address payable account, string calldata name) external {
    _addPassenger(account, name);
  }

  // Define a function 'renouncePassenger' to renounce this role
  function renouncePassenger() public {
    _removePassenger(msg.sender);
  }

  // Define an internal function '_addPassenger' to add this role, called by 'addPassenger'
  function _addPassenger(address payable account, string memory name) private {
    passengers[account].name = name;
    passengerByName[name] = account;
    withdrawable[account] = 0;
    emit PassengerAdded(account);
  }

  // Define an internal function '_removePassenger' to remove this role, called by 'removePassenger'
  function _removePassenger(address account) private {
    delete passengerByName[passengers[account].name];
    delete passengers[account];
    emit PassengerRemoved(account);
  }

  function getPassenger(string memory name)
    public
    view
    returns (address)
  {
    return passengerByName[name];
  }

  function pay(string memory passengerName, uint256 payment)
    internal
    onlyPassenger(passengerByName[passengerName])
  {
    address payable passenger = passengerByName[passengerName];
    uint256 currentAmount = withdrawable[passenger];
    withdrawable[passenger] = currentAmount.add(payment);
  }

  function withdraw(address payable passenger, uint256 amount)
    external
    onlyPassenger(passenger)
  {
    uint256 currentAmount = withdrawable[passenger];
    require(currentAmount >= amount, "Passengers cannot request more than withdrawable amount");
    withdrawable[passenger] = currentAmount.sub(amount);
    passenger.transfer(amount);
  }

}