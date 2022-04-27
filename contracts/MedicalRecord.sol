// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorize.sol";

contract MedicalRecord {
    struct medicalRecordInfo {
        uint256 totalApproved;
        uint256 totalPending;
        uint256 totalRejected;
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

    Authorize public authorize;
    mapping(address => medicalRecordInfo) public userToMedicalRecords;
    mapping(address => recordData[]) public userToData;
    mapping(string => recordData) public ipfsToRecordData;
    mapping(address => mapping(address => bool)) public whitelist;

    event setStateToMedicalRecord(status _setState, string _ipfsHash);
    event addNewMedicalRecord(
        string _ipfsHash,
        address _userAdress,
        status _addNew
    );
    event SetWhileList(address _patient, address _doctor, bool _status);

    constructor(address _authorizeInstance) {
        authorize = Authorize(_authorizeInstance);
    }

    modifier onlyAllowedRole(bytes32 role, address account) {
        require(authorize.hasRole(role, account));
        _;
    }

    function setWhiteList(address _doctor, bool _status) external {
        whitelist[msg.sender][_doctor] = _status;
        emit SetWhileList(msg.sender, _doctor, _status);
    }

    function changeState(
        address _userAddress,
        string memory _ipfsHash,
        status _recordStatus
    ) public onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender) {
        require(
            _recordStatus != status.PENDING,
            "This medical record is already in this state"
        );
        require(
            ipfsToRecordData[_ipfsHash].recordStatus == status.PENDING,
            "Only pending status can be set to another status"
        );

        ipfsToRecordData[_ipfsHash].recordStatus = _recordStatus;

        if (_recordStatus == status.APPROVED) {
            userToMedicalRecords[_userAddress].totalApproved++;
        }

        if (_recordStatus == status.REJECTED) {
            userToMedicalRecords[_userAddress].totalRejected++;
        }

        for (uint256 i = 0; i < userToData[_userAddress].length; i++) {
            if (
                keccak256(
                    abi.encodePacked(userToData[_userAddress][i].ipfsHash)
                ) == keccak256(abi.encodePacked(_ipfsHash))
            ) {
                userToData[_userAddress][i].recordStatus = _recordStatus;
                break;
            }
        }
        userToMedicalRecords[_userAddress].totalPending--;
        emit setStateToMedicalRecord(
            ipfsToRecordData[_ipfsHash].recordStatus,
            _ipfsHash
        );
    }

    function addMedicalRecord(address _userAddress, string memory _ipfsHash)
        public
        onlyAllowedRole(authorize.DOCTOR_ROLE(), msg.sender)
    {
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
        uint256 total;
        if (_statusRecord == status.PENDING) {
            total = userToMedicalRecords[_userAddress].totalPending;
        }

        if (_statusRecord == status.APPROVED) {
            total = userToMedicalRecords[_userAddress].totalApproved;
        }

        if (_statusRecord == status.REJECTED) {
            total = userToMedicalRecords[_userAddress].totalRejected;
        }

        string[] memory ipfsArray = new string[](total);
        uint256 y;
        for (uint256 i = 0; i < userToData[_userAddress].length; i++) {
            if (userToData[_userAddress][i].recordStatus == _statusRecord) {
                ipfsArray[y] = userToData[_userAddress][i].ipfsHash;
                y++;
            }
        }

        return ipfsArray;
    }
}
