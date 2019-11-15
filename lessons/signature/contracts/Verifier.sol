
pragma solidity >=0.5.0 <0.6.0;
contract Verifier {
    event evRecoveredAddress(address);
    function recoverAddr(
            bytes32 msgHash,
            uint8 v,
            bytes32 r,
            bytes32 s)
        public
        returns (address) {
        bytes memory garbagePrefix = "\x19Ethereum Signed Message:\n32";
        bytes32 hash = keccak256(
            abi.encodePacked(
                garbagePrefix,
                msgHash));
        address addr = ecrecover(hash, v, r, s);
        //emit evRecoveredAddress(addr);
        return addr;
    }
}