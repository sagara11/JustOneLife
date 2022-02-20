const Authorize = artifacts.require("./Authorize.sol");

contract("Authorize", (accounts) => {
  it("...should set account role to manager.", async () => {
    const authorizeInstance = await Authorize.deployed();
    const managerRole = web3.utils.keccak256("MANAGER");

    // Set role to manager
    await authorizeInstance.setManager(accounts[2], {from: accounts[0]});

    // Check manager role
    const hasRoleManager = await authorizeInstance.hasRole(
      managerRole,
      accounts[2]
    );

    assert.equal(hasRoleManager, true, "The role has been set to account");
  });

  it("...should set account role to patient.", async () => {
    const authorizeInstance = await Authorize.deployed();
    const patientRole = web3.utils.keccak256("PATIENT");

    // Set role to patient
    await authorizeInstance.setPatient(accounts[2], {from: accounts[0]});

    // Check patient role
    const hasRolePatient = await authorizeInstance.hasRole(
      patientRole,
      accounts[2]
    );

    assert.equal(hasRolePatient, true, "The role has been set to account");
  });

  it("...should set account role to doctor.", async () => {
    const authorizeInstance = await Authorize.deployed();
    const doctorRole = web3.utils.keccak256("DOCTOR");
    const managerRole = web3.utils.keccak256("MANAGER");

    // Set account 1 to manager
    await authorizeInstance.setManager(accounts[1], {from: accounts[0]});
    // Set account 2 to doctor
    await authorizeInstance.setDoctor(accounts[1], accounts[2], {
      from: accounts[1],
    });

    const hasRoleDoctor = await authorizeInstance.hasRole(
      doctorRole,
      accounts[2]
    );

    assert.equal(hasRoleDoctor, true, "The role has been set to account");
  });

  it("...should return doctor address list by manager address.", async () => {
    const authorizeInstance = await Authorize.deployed();
    // Set account 1 to manager
    await authorizeInstance.setManager(accounts[1], {from: accounts[0]});
    // Set account 2 to doctor
    await authorizeInstance.setDoctor(accounts[1], accounts[2], {
      from: accounts[1],
    });
    // Set account 3 to doctor
    await authorizeInstance.setDoctor(accounts[1], accounts[3], {
      from: accounts[1],
    });

    const doctorAddresses = await authorizeInstance.getDoctors(accounts[1]);

    assert.equal(doctorAddresses.length, 2, "The number of doctors is correct");
  });

  it("...should return role of a user.", async () => {
    const authorizeInstance = await Authorize.deployed();

    const bnRoles = await authorizeInstance.getRole(accounts[0]);
    const roles = [];

    for (let i = 0; i < bnRoles.length; i++) {
      roles.push(bnRoles[i].toNumber());
    }

    assert.deepEqual(roles, [ 0, 0, 1, 1 ], "msgSender have manager and admin role");
  });
});
