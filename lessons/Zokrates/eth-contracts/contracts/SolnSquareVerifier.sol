pragma solidity >=0.4.21 <0.6.0;
//pragma solidity ^0.5.0;

import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract MyVerifier is Verifier {}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {

	MyVerifier private verifier;

	constructor(address verifierAddress, string memory name, string memory symbol)
		CustomERC721Token(name, symbol)
		public
    {
        verifier = MyVerifier(verifierAddress);
    }
// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address account;
    }

// TODO define an array of the above struct
    Solution[] private solutions;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public mapSolution;

// TODO Create an event to emit when a solution is added
    event evSolutionAdded(uint256 _index, address account);

// TODO Create a function to add the solutions to the array and emit the event
	function addSolution(bytes32 _key, uint256 _index, address _account)
        public
    {
	    Solution memory solution = Solution({index: _index, account: _account});
	    solutions.push(solution);
	    mapSolution[_key] = solution;
	    emit evSolutionAdded(_index, _account);
	}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
	function mintToken(
			uint256 _index,
			address _account,
			uint[2] memory a,
			uint[2][2] memory b,
			uint[2] memory c,
			uint[3] memory input)
		public
	{
        require(verifier.verifyTx(a, b, c, input) == true, "Proof invlaid");
		bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
		require(mapSolution[key].account == address(0), "Solution has already been used.");
        addSolution(key, _index, _account);
        mint(_account, _index);
	}
}