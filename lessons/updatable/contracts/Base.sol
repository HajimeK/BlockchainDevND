pragma solidity >0.5.0 <0.6.0;

//ipmort "zos-lib/contracts/migrations/Migratable.sol";
import "zos-lib/contracts/Initializable.sol";

contract Base is Initializable {
    address internal _owner;
    bool internal __isOperational;
    
    function initialize(bool operational) initializer public {
        _owner = msg.sender;
        __isOperational = operational;
    }

    modifier _isOperational() {
        assert(isOperational());
        _;
    }

    function setOperational(bool _setOperational)
        public
        _isOperational()
    {
        __isOperational = _setOperational;
    }

    function isOperational()
        public
        returns(bool)
    {
        return __isOperational;
    }
}

