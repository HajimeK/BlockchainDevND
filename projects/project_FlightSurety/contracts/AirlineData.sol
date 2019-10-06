//pragma solidity ^0.4.24;
pragma solidity >=0.4.21 <0.6.0;

// Define a contract 'AirlineRole' to manage this role - add, remove, check
contract AirlineData {

  struct Airline {
    string name;
    bool isApproved;
    bool isFunded;
    uint numOfApprovers;
  }
  mapping(address => Airline) private airlines;
  mapping(address => mapping(address => bool)) approved;
  mapping(string => address) airlineByName;

  uint private entries = 0;
  uint constant private minimumAirlines = 4;                     // number of airlines that can be added without consensus

  // Define 2 events, one for Adding, and other for Removing
  //event AirlineAdded(address indexed account);
  //event AirlineRemoved(address indexed account);
  //event AirlineApproved(address indexed account);
  //event AirlineFunded(address indexed account);

  // // In the constructor make the address that deploys this contract the 1st Airline
  // constructor() public {
  //   // contractOwner = msg.sender;
  //   //_addAirline(msg.sender);
  // }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAirline(address account) {
    require(isAirline(account), "Not an airline");
    _;
  }

  modifier onlyApproved(address account) {
    require(isApproved(account), "No Approved");
    _;
  }

  modifier firstApproved(address account, address approver) {
    require(!approved[account][approver],  "This approver already approved this airline");
    _;
  }

  modifier onlyFunded(address account) {
    require(isFunded(account), "Not funded");
    _;
  }

  modifier notYetFunded(address account) {
    require(!isFunded(account), "Already funded");
    _;
  }

  function isApproved(address account)
    public
    view
    returns (bool) {
    return airlines[account].isApproved;
  }

  function isFunded(address account)
    public
    view
    returns (bool) {
    return airlines[account].isFunded;
  }

  // Define a function 'isAirline' to check this role
  function isAirline(address account) public view returns (bool) {
    return (bytes(airlines[account].name).length != 0);
  }

  // Define a function 'addAirline' that adds this role
  function addAirline(
      address account,
      string calldata name)
    external
  {
    _addAirline(account, name);
  }

  // Define a function 'renounceAirline' to renounce this role
  function renounceAirline(address account) external {
    _removeAirline(account);
  }

  // Define an internal function '_addAirline' to add this role, called by 'addAirline'
  function _addAirline(
      address account,
      string memory name)
    internal {
    require(bytes(name).length != 0, "Airline company ame is mandatory");

    entries++;
    airlines[account] = Airline({name : name, isApproved : false, isFunded : false, numOfApprovers : 0});
    airlines[account].isApproved = _approvable(airlines[account]); // onlyt true when _lessThanMinimum() is true
    airlineByName[name] = account;

    //emit AirlineAdded(account);
  }

  // Define an internal function '_removeAirline' to remove this role, called by 'removeAirline'
  function _removeAirline(address account) private {
    delete airlines[account];
    entries--;

    //emit AirlineRemoved(account);
  }

  function getAirline(string calldata name)
    external
    view
    returns (address)
  {
    return airlineByName[name];
  }

  function _lessThanMinimum()
    private
    view
    returns (bool) {
    return (entries <= minimumAirlines);
  }

  function _approvable(Airline memory airline)
    private
    view
    returns (bool) {
    return _lessThanMinimum() || (2 * airline.numOfApprovers > entries);
  }

  function approveAirline(address account, address approver)
    external
    onlyAirline(account)
    onlyAirline(approver)
    onlyFunded(approver)
    firstApproved(account, approver) {
    require(account != approver, "Cannot approve self");
    airlines[account].numOfApprovers++;
    approved[account][approver] = true;
    if( _approvable(airlines[account])) {
      airlines[account].isApproved = true;
      //emit AirlineApproved(account);
    }
  }

  function funded(address account)
    external
    onlyAirline(account)
    notYetFunded(account) {
    airlines[account].isFunded = true;
    //emit AirlineFunded(account);
  }
}