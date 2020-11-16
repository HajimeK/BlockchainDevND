pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Device
 * Device - a contract for my non-fungible creatures.
 */

contract Device is ERC721 {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    string deviceType;
    bool isRegistered;

    constructor() public ERC721("IoTItem", "ITM") {}

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyServiceProvider(address account) {
        require(isAirline(account), "Not an airline");
        _;
    }

    modifier onlySold(address account) {
        require(isApproved(account), "No Approved");
        _;
    }

    modifier onlyFunded(address account) {
        require(isFunded(account), "Not funded");
        _;
    }

    // Define a function 'isAirline' to check this role
    function isServiceProvider(address account) public view returns (bool) {
        return (bytes(airlines[account].name).length > 0);
    }

    // Define a function 'addAirline' that adds this role
    function addTenant(
        string calldata name,
        address account,
        address accountRegisterBy
    ) external {
        _addTenant(name, account, accountRegisterBy);
    }

    // Define a function 'renounceAirline' to renounce this role
    function renounceTenant(address account) external {
        _removeAirline(account);
    }

    // Define an internal function '_addAirline' to add this role, called by 'addAirline'
    function _addTenant(
        string memory _name,
        address account,
        address accountRegisterBy
    ) internal {
        require(bytes(_name).length != 0, "Airline company name is mandatory");
        if ((entries > 0) && (entries < 4)) {
            // initial airline is automatically resigered, but  others should be registered by other.already added.
            require(
                isApproved(accountRegisterBy),
                "Only existing airline may register a new airline"
            );
        }

        entries++;
        airlines[account] = Airline({
            name: _name,
            isApproved: false,
            isFunded: false,
            numOfApprovers: 0
        });
        airlines[account].isApproved = _approvable(airlines[account]); // onlyt true when _lessThanMinimum() is true
        airlineByName[_name] = account;
    }

    // Define an internal function '_removeAirline' to remove this role, called by 'removeAirline'
    function _removeTenant(address account) private {
        delete airlines[account];
        entries--;
    }

    function getAirline(string calldata name) external view returns (address) {
        return airlineByName[name];
    }

    function approveAirline(address account, address approver)
        external
        onlyAirline(account)
        onlyAirline(approver)
        onlyFunded(approver)
        firstApproved(account, approver)
    {
        require(account != approver, "Cannot approve self");
        airlines[account].numOfApprovers++;
        approved[account][approver] = true;
        if (_approvable(airlines[account])) {
            airlines[account].isApproved = true;
            //emit AirlineApproved(account);
        }
    }

    function funded(address account)
        external
        onlyAirline(account)
        notYetFunded(account)
    {
        airlines[account].isFunded = true;
        //emit AirlineFunded(account);
    }
}
