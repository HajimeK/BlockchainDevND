pragma solidity >0.5.0 <0.6.0;

import "./Base.sol";

contract BaseUp is Base {
  function forceOperational() public {
      __isOperational = true;
  }
}