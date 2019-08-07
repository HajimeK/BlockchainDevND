pragma solidity ^0.5.8;

contract Fundraiser {
    mapping(address=>uint) balances;

    function withdrawCoins() public {
        uint withdrawAmount = balances[msg.sender];
        Wallet wallet = Wallet(msg.sender);
        wallet.payout.value(withdrawAmount)();
        balances[msg.sender] = 0;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function contribute() public payable {
        balances[msg.sender] += msg.value;
    }

    function () external payable {

    }
}