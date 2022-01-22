const Authorize = artifacts.require("./Authorize.sol");

contract("Authorize", accounts => {
  it("...should set account role to manager.", async () => {
    const authorizeInstance = await Authorize.deployed();
    const managerRole = web3.utils.keccak256('MANAGER');

    // Set role to manager
    await authorizeInstance.setManager(accounts[2], { from: accounts[0] });

    // Check manager role
    const hasRoleManager = await authorizeInstance.hasRole(managerRole, accounts[2]);

    assert.equal(hasRoleManager, true, "The role has been set to account");
  });

  it("...should set account role to patient.", async () => {
    const authorizeInstance = await Authorize.deployed();
    const patientRole = web3.utils.keccak256('PATIENT');

    // Set role to patient
    await authorizeInstance.setPatient(accounts[2], { from: accounts[0] });

    // Check manager role
    const hasRolePatient = await authorizeInstance.hasRole(patientRole, accounts[2]);

    assert.equal(hasRolePatient, true, "The role has been set to account");
  });
});
