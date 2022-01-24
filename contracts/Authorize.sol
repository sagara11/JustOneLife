// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Authorize is Ownable, AccessControl {
  bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");
  bytes32 public constant PATIENT_ROLE = keccak256("PATIENT");
  bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR");

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

  function getRole(address userAddress) external view returns (uint[] memory) {
    uint[] memory roleArray = new uint[](4);
    if (hasRole(PATIENT_ROLE, userAddress)) {
      roleArray[0] = 1;
    }
    if (hasRole(DOCTOR_ROLE, userAddress)) {
      roleArray[1] = 1;
    }
    if (hasRole(MANAGER_ROLE, userAddress)) {
      roleArray[2] = 1;
    }
    if (hasRole(DEFAULT_ADMIN_ROLE, userAddress)) {
      roleArray[3] = 1;
    }
    return roleArray;
  }
}
