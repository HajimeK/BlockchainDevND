// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(Verifier)
    .then(() => {
      {
        let config = {
          localhost: {
            url: 'http://localhost:8545',
            appAddress: Verifier.address
          }
        }
        fs.writeFileSync(__dirname + '/../src/config.json', JSON.stringify(config, null, '\t'), 'utf-8');
      }
    });
};