// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorize.sol";

contract MedicalRecord {
    struct medicalRecordInfo {
      uint totalApproved;
      uint totalPending;
      uint totalRejected;
    }

    struct recordData {
      string ipfsHash;
      status recordStatus;
    }

    enum status {
        PENDING,
        APPROVED,
        REJECTED
    }

    Authorize internal authorize;
    mapping(address => medicalRecordInfo) public userToMedicalRecords;
    mapping(address => recordData[]) public userToData;
    mapping(string => recordData) public ipfsToRecordData;

    event setStateToMedicalRecord(status _setState, string _ipfsHash);
    event addNewMedicalRecord(string _ipfsHash, address _userAdress, status _addNew);

    constructor(address _authorizeInstance) {
      authorize = Authorize(_authorizeInstance);
    }

    modifier onlyAllowedRole(bytes32 role, address account) {
      require(authorize.hasRole(role, account));
      _;
    }

    function changeState(address _userAddress, string memory _ipfsHash, status _recordStatus) onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender) public{
      require(_recordStatus != status.PENDING, "This medical record is already in this state");
      require(ipfsToRecordData[_ipfsHash].recordStatus == status.PENDING, "Only pending status can be set to another status");

      ipfsToRecordData[_ipfsHash].recordStatus = _recordStatus;

      if(_recordStatus == status.APPROVED){
        userToMedicalRecords[_userAddress].totalApproved++;
      }

      if(_recordStatus == status.REJECTED){
        userToMedicalRecords[_userAddress].totalRejected++;
      }

      for(uint i=0; i<userToData[_userAddress].length; i++){
        if(keccak256(abi.encodePacked(userToData[_userAddress][i].ipfsHash)) == keccak256(abi.encodePacked(_ipfsHash))){
          userToData[_userAddress][i].recordStatus = _recordStatus;
          break;
        }
      }
      userToMedicalRecords[_userAddress].totalPending--;
      emit setStateToMedicalRecord(ipfsToRecordData[_ipfsHash].recordStatus, _ipfsHash);
    }

    function addMedicalRecord(address _userAddress, string memory _ipfsHash) onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender) public {
      recordData storage newRecordData = ipfsToRecordData[_ipfsHash];
      newRecordData.ipfsHash = _ipfsHash;
      newRecordData.recordStatus = status.PENDING;
      status statusOfNewRecord = newRecordData.recordStatus;
      userToMedicalRecords[_userAddress].totalPending++;
      userToData[_userAddress].push(newRecordData);

      emit addNewMedicalRecord(_ipfsHash, _userAddress, statusOfNewRecord);
    }

    function getMedicalRecord(address _userAddress, status _statusRecord)
        external
        view
        returns (string[] memory)
    {
      uint total;
      if(_statusRecord == status.PENDING) {
        total = userToMedicalRecords[_userAddress].totalPending;
      }

      if(_statusRecord == status.APPROVED) {
        total = userToMedicalRecords[_userAddress].totalApproved;
      }

      if(_statusRecord == status.REJECTED) {
        total = userToMedicalRecords[_userAddress].totalRejected;
      }

      string[] memory ipfsArray = new string[](total);
      uint y;
      for(uint i = 0; i<userToData[_userAddress].length; i++){
        if(userToData[_userAddress][i].recordStatus == _statusRecord){
          ipfsArray[y] = userToData[_userAddress][i].ipfsHash;
          y++;
        }
      }

      return ipfsArray;
    }
}
