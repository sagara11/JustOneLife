// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Authorize is Ownable, AccessControl {
  bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");
  bytes32 public constant PATIENT_ROLE = keccak256("PATIENT");

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _grantRole(MANAGER_ROLE, _msgSender());
  }

  // Only accounts with DEFAULT_ADMIN_ROLE role can set another account role to manager
  function setManager(address userAddress) public {
    grantRole(MANAGER_ROLE, userAddress);
  }

  function setPatient(address userAddress) public {
    _grantRole(PATIENT_ROLE, userAddress);
  }
}
