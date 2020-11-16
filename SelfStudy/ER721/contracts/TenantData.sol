pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Tenant
 * Tenant - a contract for tenant.
 */

contract TenantData {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)

    bool isFunded;
    struct Tenant {
        string name;
        bool isFunded;
        uint256 fundAmount;
    }
    mapping(address => Tenant) private tenants;

    modifier onlyFunded(address account) {
        require(isFunded(account), "Not funded");
        _;
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
        _removeTenant(account);
    }

    // Define an internal function '_addAirline' to add this role, called by 'addAirline'
    function _addTenant(
        string memory _name,
        address account,
        address accountRegisterBy
    ) internal {
        entries++;
        tenants[account] = Tenant({
            name: _name,
            isFunded: false,
            fundAmount: 0
        });
    }

    // Define an internal function '_removeAirline' to remove this role, called by 'removeAirline'
    function _removeTenant(address account) private {
        delete airlines[account];
    }

    function funded(address account)
        external
        onlyAirline(account)
        notYetFunded(account)
    {
        airlines[account].isFunded = true;
    }
}
