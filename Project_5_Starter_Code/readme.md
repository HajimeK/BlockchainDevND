# Project Report

## Setup and Prepare

truffle-hdwallet-provider and openzeppelin-solidity dependencies are installed. If not you can always install it with the commands:

>    npm install --save truffle-hdwallet-provider
>    npm install --save openzeppelin-solidity

For starting the development console, run:

>    truffle develop

For compiling the contract, inside the development console, run:

>    compile

 For migrating the contract to the locally running Ethereum network, inside the development console, run:

 >   migrate --reset

For running unit tests the contract, inside the development console, run:

>    test

For running the Front End of the DAPP, open another terminal window and go inside the project directory, and run:

>    cd app

>   npm run dev

## Project 5 Instructions

### Task 1

Your Project is to Modify the StarNotary version 2 contract code to achieve the following:

    Add a name and a symbol for your starNotary tokens. Resource

    

    Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.

    Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users.

    Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.

| Criteria | Meets Specifications |
|---|---|
|The smart contract tokens should have a name and a symbol. | Add a name and a symbol to the starNotary tokens. In the Starter Code (StarNotary.sol file) you implement: <br>// Implement Task 1 Add a name and symbol properties <br>// name: Is a short name to your token <br>// symbol: Is a short string like 'USD' -> 'American Dollar' |
| Implement the function: lookUptokenIdToStarInfo in StarNotary.sol file // Implement Task 1 lookUptokenIdToStarInfo function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory) {  } | Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star. |
| Implement the function: exchangeStars in StarNotary.sol file. // Implement Task 1 Exchange Stars function function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {  }	 | Add a function called exchangeStars, so 2 users can exchange their star tokens. Do not worry about the price, just write code to exchange stars between users. |
| Implement the function transferStar in StarNotary.sol file. function transferStar(address _to1, uint256 _tokenId) public {     }	| Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.|


### Task 2

Add supporting unit tests, to test the following:

    The token name and token symbol are added properly.

    2 users can exchange their stars.

    Stars Tokens can be transferred from one address to another.

### Task 3

Deploy your Contract to Rinkeby

    Edit the truffle.config file to add settings to deploy your contract to the Rinkeby Public Network.

Helper Points:

    Command used to deploy to Rinkeby truffle migrate --reset --network rinkeby

    You will need to have your Metamask’s seed and Infura setup.

    This was shown to you in detail in the lesson on Solidity, while creating ERC-20 tokens on Rinkeby.

### Task 4

Modify the front end of the DAPP to achieve the following:

    Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files)

## Project Submission Instructions:

    Inside your project folder, create a Readme.md file. The readme.md file should include the following:
        Specify the Truffle version and OpenZeppelin version used in the project.
        Your ERC-721 Token Name
        Your ERC-721 Token Symbol
        Your “Token Address” on the Rinkeby Network

    Upload your folder to GitHub.

    Submit your GitHub Repository Link.

**truffle(develop)> version**
Truffle v5.0.29 (core: 5.0.29)
Solidity v0.5.0 (solc-js)
Node v10.16.0
Web3.js v^1.2.0


## Evaluation

Your project will be evaluated by a Udacity reviewer according to the Project Rubric. Be sure to review it thoroughly before you submit. All criteria must "meet specifications" in order to pass.

