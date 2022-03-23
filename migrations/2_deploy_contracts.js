var Authorize = artifacts.require("./Authorize.sol");
var MedicalRecord = artifacts.require("./MedicalRecord.sol");

module.exports = async function (deployer) {
  await deployer.deploy(Authorize);
  await deployer.deploy(MedicalRecord, Authorize.address);
};
