// migrating the appropriate contracts
var erc721 = artifacts.require("./ERC721.sol");

module.exports = function(deployer) {
  deployer.deploy(erc721);
};