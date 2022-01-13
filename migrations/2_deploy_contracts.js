var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Authorize = artifacts.require("./Authorize.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Authorize);
};
