pragma solidity >0.5.0 <0.6.0;

//ipmort "zos-lib/contracts/migrations/Migratable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Base is Initializable {

    uint256 private _stage;
    function initialize(uint256 stage) initializer public {
        _stage = stage;
    }
}

