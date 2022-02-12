var Authorize = artifacts.require("./Authorize.sol");

module.exports = function(deployer) {
  deployer.deploy(Authorize);
};
