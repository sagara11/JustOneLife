// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Authorize.sol";

contract TestAuthorize {

  function testItDeployedRole() public {
    Authorize authorize = Authorize(DeployedAddresses.Authorize());
    address deployedAddress = msg.sender;
    bool expected = true;
    bytes32 managerRole = keccak256("MANAGER");
    bytes32 adminRole = 0x00;

    bool userHasRoleManager = authorize.hasRole(managerRole, deployedAddress);
    bool userHasRoleAdmin = authorize.hasRole(adminRole, deployedAddress);

    Assert.equal(userHasRoleManager, expected, "It should has manager role.");
    Assert.equal(userHasRoleAdmin, expected, "It should has admin role.");
  }
}
