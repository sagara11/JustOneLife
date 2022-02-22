var Authorize = artifacts.require("./Authorize.sol");
var MedicalRecord = artifacts.require("./MedicalRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(Authorize);
  deployer.deploy(MedicalRecord, Authorize.address);
};
