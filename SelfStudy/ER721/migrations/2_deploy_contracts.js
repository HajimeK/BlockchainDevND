// migrating the appropriate contracts
var IOTApp = artifacts.require("./IOTApp.sol");
var IOTData = artifacts.require("./IOTData.sol");
var TenantData = artifacts.require("./TenantData.sol");
var Device = artifacts.require("./Device.sol");

module.exports = function(deployer) {
  deployer.deploy(IOTApp);
  deployer.deploy(IOTData);
  deployer.deploy(TenantData);
  deployer.deploy(Device);
};