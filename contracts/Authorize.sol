// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Authorize is Ownable, AccessControl {
  bytes32 public constant MANAGER_ROLE = keccak256("MANAGER");
  bytes32 public constant PATIENT_ROLE = keccak256("PATIENT");
  bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR");

  mapping(address => address[]) private managerToDoctors;
  mapping(address => address) private doctorToManager;

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _grantRole(MANAGER_ROLE, _msgSender());
    _setRoleAdmin(DOCTOR_ROLE, MANAGER_ROLE);
  }

  // Only accounts with DEFAULT_ADMIN_ROLE role can set another account role to manager
  function setManager(address _userAddress) public {
    grantRole(MANAGER_ROLE, _userAddress);
  }

  function setPatient(address _userAddress) public {
    _grantRole(PATIENT_ROLE, _userAddress);
  }

  function setDoctor(address _managerAddress, address _userAddress) public {
    grantRole(DOCTOR_ROLE, _userAddress);
    if (doctorToManager[_userAddress] != _managerAddress) {
      managerToDoctors[_managerAddress].push(_userAddress);
      doctorToManager[_userAddress] = _managerAddress;
    }
  }

  function getDoctors(address _managerAddress) external view onlyRole(MANAGER_ROLE) returns (address[] memory) {
    return managerToDoctors[_managerAddress];
  }

  function getRole(address _userAddress) external view returns (uint[] memory) {
    uint[] memory roleArray = new uint[](4);
    if (hasRole(PATIENT_ROLE, _userAddress)) {
      roleArray[0] = 1;
    }
    if (hasRole(DOCTOR_ROLE, _userAddress)) {
      roleArray[1] = 1;
    }
    if (hasRole(MANAGER_ROLE, _userAddress)) {
      roleArray[2] = 1;
    }
    if (hasRole(DEFAULT_ADMIN_ROLE, _userAddress)) {
      roleArray[3] = 1;
    }
    return roleArray;
  }
}
