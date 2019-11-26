pragma solidity >0.5.0 <0.6.0;

import "./Base.sol";

contract Update is Base {
  uint256 private_update;

  event evEvent(uint256);

  function emitEvent(uint update) public {
    emit evEvent(update);
  }
}